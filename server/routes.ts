import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertCameraSchema, buildRtspUrl } from "@shared/schema";
import { ZodError } from "zod";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import ffmpeg from 'fluent-ffmpeg';

// Asegurar que existen los directorios necesarios
const RECORDINGS_DIR = path.join(process.cwd(), "recordings");
const THUMBNAILS_DIR = path.join(process.cwd(), "recordings", "thumbnails");

if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true, mode: 0o755 });
}
if (!fs.existsSync(THUMBNAILS_DIR)) {
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true, mode: 0o755 });
}

let wss: WebSocketServer;
const recordingProcesses = new Map<number, { process: any, recording: any }>();
const streamProcesses = new Map<number, { process: any, clients: Set<WebSocket> }>();
const analysisProgress = new Map<string, { progress: number; status: string; framesAnalyzed: number; totalFrames: number; errorMessage: string | null }>();

async function startStreaming(camera: any, ws: WebSocket) {
  try {
    let streamProcess = streamProcesses.get(camera.id);

    if (!streamProcess) {
      const rtspUrl = buildRtspUrl(camera);
      console.log(`Starting stream for camera ${camera.id} - ${rtspUrl}`);

      // Actualizar estado inicial
      await storage.updateCamera(camera.id, {
        status: 'connecting',
        lastSeen: new Date(),
        metrics: {
          fps: 0,
          bitrate: 0,
          resolution: '',
          uptime: 0,
          connectionErrors: 0,
          lastErrorTime: null,
          lastErrorMessage: null
        }
      });

      const ffmpeg = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',
        '-i', rtspUrl,
        '-f', 'mpegts',
        '-codec:v', 'mpeg1video',
        '-s', '640x480',
        '-b:v', '800k',
        '-r', '30',
        '-bf', '0',
        '-muxdelay', '0.001',
        'pipe:1'
      ]);

      let startTime = Date.now();
      let frameCount = 0;
      let lastMetricUpdate = Date.now();
      let isConnected = false;

      streamProcess = {
        process: ffmpeg,
        clients: new Set([ws])
      };

      ffmpeg.stdout.on('data', (data) => {
        // Si recibimos datos, significa que la conexión está establecida
        if (!isConnected) {
          isConnected = true;
          storage.updateCamera(camera.id, {
            status: 'connected',
            lastSeen: new Date()
          }).catch(console.error);
        }

        frameCount++;
        const now = Date.now();

        // Actualizar métricas cada 5 segundos
        if (now - lastMetricUpdate >= 5000) {
          const uptime = Math.floor((now - startTime) / 1000);
          const fps = Math.round((frameCount / 5));

          storage.updateCamera(camera.id, {
            status: 'connected',
            lastSeen: new Date(),
            metrics: {
              fps,
              bitrate: 800,
              resolution: '640x480',
              uptime,
              connectionErrors: camera.metrics?.connectionErrors || 0,
              lastErrorTime: camera.metrics?.lastErrorTime,
              lastErrorMessage: camera.metrics?.lastErrorMessage
            }
          }).catch(console.error);

          frameCount = 0;
          lastMetricUpdate = now;

          // Notificar a los clientes sobre la actualización
          wss.clients.forEach((client: any) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "camera_metrics_updated",
                cameraId: camera.id,
                metrics: {
                  fps,
                  bitrate: 800,
                  resolution: '640x480',
                  uptime
                }
              }));
            }
          });
        }

        streamProcess?.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            try {
              client.send(data);
            } catch (error) {
              console.error(`Error sending stream data to client:`, error);
            }
          }
        });
      });

      ffmpeg.stderr.on('data', (data) => {
        const output = data.toString();
        console.log(`Stream FFmpeg (Camera ${camera.id}):`, output);

        // Detectar errores comunes y actualizar métricas
        if (output.includes('Connection refused') || output.includes('Connection timed out')) {
          storage.updateCamera(camera.id, {
            status: 'error',
            metrics: {
              ...camera.metrics,
              connectionErrors: (camera.metrics?.connectionErrors || 0) + 1,
              lastErrorTime: new Date(),
              lastErrorMessage: output
            }
          }).catch(console.error);
        }
      });

      ffmpeg.on('error', (error) => {
        console.error(`Stream FFmpeg error for camera ${camera.id}:`, error);
        ws.close();
      });

      ffmpeg.on('close', (code) => {
        console.log(`Stream FFmpeg process closed for camera ${camera.id} with code ${code}`);
        streamProcesses.delete(camera.id);
        ws.close();
      });

      streamProcesses.set(camera.id, streamProcess);
    } else {
      streamProcess.clients.add(ws);
    }

    ws.on('close', () => {
      const process = streamProcesses.get(camera.id);
      if (process) {
        process.clients.delete(ws);
        if (process.clients.size === 0) {
          process.process.kill();
          streamProcesses.delete(camera.id);
        }
      }
    });
  } catch (error) {
    console.error('Error in startStreaming:', error);
    ws.close();
  }
}

async function startRecording(camera: any) {
  try {
    if (!fs.existsSync(RECORDINGS_DIR)) {
      console.log(`Creating recordings directory: ${RECORDINGS_DIR}`);
      fs.mkdirSync(RECORDINGS_DIR, { recursive: true, mode: 0o755 });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const prefix = camera.recordingPrefix ? `${camera.recordingPrefix}` : `cam${camera.id}`;
    const fileName = `${prefix}-${camera.id}-${timestamp}.mp4`;
    const outputPath = path.join(RECORDINGS_DIR, fileName);

    console.log(`Starting recording for camera ${camera.id}`);
    console.log(`Output path: ${outputPath}`);

    const recording = await storage.createRecording({
      cameraId: camera.id,
      filePath: outputPath,
      startTime: new Date(),
      title: camera.recordingPrefix ? `${camera.recordingPrefix} ${timestamp}` : undefined,
    });

    const rtspUrl = buildRtspUrl(camera);
    console.log(`RTSP URL: ${rtspUrl}`);

    // Comando ffmpeg mejorado para asegurar una grabación más robusta
    const ffmpegCommand = [
      '-y', // Sobrescribir archivo si existe
      '-rtsp_transport', 'tcp', // Usar TCP para más estabilidad
      '-i', rtspUrl,
      '-c:v', 'libx264', // Usar H.264 codec
      '-preset', 'veryfast', // Preset rápido para menor uso de CPU
      '-b:v', '2M', // Bitrate de 2 Mbps
      '-maxrate', '2.5M', // Máximo bitrate
      '-bufsize', '5M', // Buffer size
      '-vf', 'scale=1280:720', // Escalar a 720p
      '-r', '30', // 30 FPS
      '-an', // No audio
      '-f', 'mp4', // Forzar formato MP4
      '-movflags', '+faststart', // Optimizar para streaming
      outputPath
    ];

    console.log(`FFmpeg command: ffmpeg ${ffmpegCommand.join(' ')}`);

    const ffmpeg = spawn('ffmpeg', ffmpegCommand);

    ffmpeg.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`FFmpeg (Camera ${camera.id}):`, output);
    });

    ffmpeg.stdout.on('data', (data) => {
      console.log(`FFmpeg stdout (Camera ${camera.id}):`, data.toString());
    });

    ffmpeg.on('error', async (error) => {
      console.error(`FFmpeg process error for camera ${camera.id}:`, error);
      await storage.updateRecording(recording.id, {
        status: 'error',
        endTime: new Date()
      });
      recordingProcesses.delete(camera.id);
    });

    ffmpeg.on('close', async (code) => {
      console.log(`FFmpeg process closed for camera ${camera.id} with code ${code}`);

      // Verificar si el archivo se creó correctamente
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        console.log(`Recording file size: ${stats.size} bytes`);
      } else {
        console.error(`Recording file was not created at ${outputPath}`);
      }

      const status = code === 0 ? 'completed' : 'error';
      await storage.updateRecording(recording.id, {
        status,
        endTime: new Date()
      });
      recordingProcesses.delete(camera.id);
    });

    recordingProcesses.set(camera.id, { process: ffmpeg, recording });
    return recording;
  } catch (error) {
    console.error('Error in startRecording:', error);
    throw error;
  }
}

async function stopRecording(cameraId: number) {
  try {
    const recordingProcess = recordingProcesses.get(cameraId);
    if (recordingProcess) {
      console.log(`Stopping recording for camera ${cameraId}`);
      recordingProcess.process.kill('SIGTERM');
      await storage.updateRecording(recordingProcess.recording.id, {
        status: 'completed',
        endTime: new Date()
      });
      recordingProcesses.delete(cameraId);
    }
  } catch (error) {
    console.error(`Error stopping recording for camera ${cameraId}:`, error);
    throw error;
  }
}

async function startAllRecordings(userId: number) {
  try {
    // Obtener todas las cámaras del usuario
    const cameras = await storage.getCameras(userId);
    console.log(`Starting recording for ${cameras.length} cameras`);

    // Establecer un tiempo de inicio común (5 segundos en el futuro)
    const startTime = new Date(Date.now() + 5000);

    // Iniciar la grabación de todas las cámaras
    const promises = cameras.map(async (camera) => {
      try {
        // Si la cámara ya está grabando, detenerla primero
        if (camera.isRecording) {
          await stopRecording(camera.id);
        }
        const updatedCamera = await storage.updateCamera(camera.id, { isRecording: true });
        wss.clients.forEach((client: any) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ type: "camera_updated", camera: updatedCamera }));
          }
        });
        return await startRecording(updatedCamera);
      } catch (error) {
        console.error(`Error starting recording for camera ${camera.id}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter(r => r !== null);
  } catch (error) {
    console.error('Error starting all recordings:', error);
    throw error;
  }
}

async function stopAllRecordings(userId: number) {
  try {
    const cameras = await storage.getCameras(userId);
    console.log(`Stopping recording for ${cameras.length} cameras`);

    const promises = cameras.map(async (camera) => {
      if (camera.isRecording) {
        try {
          await stopRecording(camera.id);
          const updatedCamera = await storage.updateCamera(camera.id, { isRecording: false });
          wss.clients.forEach((client: any) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: "camera_updated", camera: updatedCamera }));
            }
          });
          return true;
        } catch (error) {
          console.error(`Error stopping recording for camera ${camera.id}:`, error);
          return false;
        }
      }
      return true;
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error stopping all recordings:', error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  const httpServer = createServer(app);
  wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  // Manejar conexiones WebSocket para streaming
  wss.on('connection', async (ws, req) => {
    const url = new URL(req.url ?? '', 'http://localhost');
    const cameraId = url.pathname.split('/')[2]; // /stream/:cameraId

    if (!cameraId) {
      ws.close();
      return;
    }

    try {
      const camera = await storage.getCamera(parseInt(cameraId));
      if (!camera) {
        ws.close();
        return;
      }

      await startStreaming(camera, ws);
    } catch (error) {
      console.error('Error handling WebSocket connection:', error);
      ws.close();
    }
  });

  app.get("/api/cameras", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const cameras = await storage.getCameras(req.user.id);
    res.json(cameras);
  });

  app.post("/api/cameras", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const camera = insertCameraSchema.parse(req.body);
      const newCamera = await storage.createCamera({
        ...camera,
        userId: req.user.id,
      });
      wss.clients.forEach((client: any) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: "camera_added", camera: newCamera }));
        }
      });
      res.status(201).json(newCamera);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json(e.errors);
      } else {
        console.error('Error creating camera:', e);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch("/api/cameras/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const camera = await storage.getCamera(parseInt(req.params.id));
      if (!camera || camera.userId !== req.user.id) {
        return res.sendStatus(404);
      }

      if (req.body.isRecording !== undefined && req.body.isRecording !== camera.isRecording) {
        try {
          if (req.body.isRecording) {
            await startRecording(camera);
          } else {
            await stopRecording(camera.id);
          }
        } catch (error) {
          console.error('Error managing recording:', error);
          return res.status(500).json({ message: "Failed to manage recording" });
        }
      }

      const updatedCamera = await storage.updateCamera(camera.id, req.body);
      wss.clients.forEach((client: any) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: "camera_updated", camera: updatedCamera }));
        }
      });
      res.json(updatedCamera);
    } catch (error) {
      console.error('Error updating camera:', error);
      res.status(500).json({ message: "Failed to update camera" });
    }
  });

  app.delete("/api/cameras/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const camera = await storage.getCamera(parseInt(req.params.id));
      if (!camera || camera.userId !== req.user.id) {
        return res.sendStatus(404);
      }
      await stopRecording(camera.id);
      await storage.deleteCamera(camera.id);
      wss.clients.forEach((client: any) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: "camera_deleted", cameraId: camera.id }));
        }
      });
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting camera:', error);
      res.status(500).json({ message: "Failed to delete camera" });
    }
  });

  app.get("/api/cameras/:id/recordings", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const camera = await storage.getCamera(parseInt(req.params.id));
      if (!camera || camera.userId !== req.user.id) {
        return res.sendStatus(404);
      }
      const recordings = await storage.getRecordings(camera.id);
      res.json(recordings);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      res.status(500).json({ message: "Failed to fetch recordings" });
    }
  });

  app.get("/api/recordings", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      // Obtener todas las cámaras del usuario
      const cameras = await storage.getCameras(req.user.id);

      // Obtener todas las grabaciones para cada cámara
      const recordingsPromises = cameras.map(camera =>
        storage.getRecordings(camera.id)
      );

      const allRecordings = await Promise.all(recordingsPromises);

      // Aplanar el array de grabaciones y ordenar por fecha de inicio
      const recordings = allRecordings
        .flat()
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

      res.json(recordings);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      res.status(500).json({ message: "Failed to fetch recordings" });
    }
  });

  app.get("/api/recordings/count", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const cameras = await storage.getCameras(req.user.id);
      const recordingsPromises = cameras.map(camera =>
        storage.getRecordings(camera.id)
      );

      const allRecordings = await Promise.all(recordingsPromises);
      const count = allRecordings.flat().length;

      res.json(count);
    } catch (error) {
      console.error('Error counting recordings:', error);
      res.status(500).json({ message: "Failed to count recordings" });
    }
  });

  app.post("/api/cameras/start-all", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordings = await startAllRecordings(req.user.id);
      res.json(recordings);
    } catch (error) {
      console.error('Error starting all recordings:', error);
      res.status(500).json({ message: "Failed to start recordings" });
    }
  });

  app.post("/api/cameras/stop-all", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      await stopAllRecordings(req.user.id);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error stopping all recordings:', error);
      res.status(500).json({ message: "Failed to stop recordings" });
    }
  });

  app.get("/api/recordings/:id/thumbnail", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      const recording = await storage.getRecording(recordingId);

      if (!recording) {
        return res.sendStatus(404);
      }

      const thumbnailPath = path.join(THUMBNAILS_DIR, `${path.basename(recording.filePath)}.thumb.jpg`);

      // Si la miniatura ya existe, enviarla
      if (fs.existsSync(thumbnailPath)) {
        res.sendFile(thumbnailPath);
        return;
      }

      // Generar miniatura usando ffmpeg
      ffmpeg(recording.filePath)
        .screenshots({
          timestamps: ['50%'],
          filename: `${path.basename(recording.filePath)}.thumb.jpg`,
          folder: THUMBNAILS_DIR,
          size: '320x180'
        })
        .on('end', () => {
          res.sendFile(thumbnailPath);
        })
        .on('error', (err) => {
          console.error('Error generating thumbnail:', err);
          res.sendStatus(500);
        });
    } catch (error) {
      console.error('Error serving thumbnail:', error);
      res.sendStatus(500);
    }
  });

  app.get("/api/recordings/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      const recordings = await storage.getRecordings(recordingId);
      const recording = recordings.find(r => r.id === recordingId);

      if (!recording) {
        return res.sendStatus(404);
      }

      res.json(recording);
    } catch (error) {
      console.error('Error fetching recording:', error);
      res.status(500).json({ message: "Failed to fetch recording" });
    }
  });

  app.get("/api/recordings/:id/stream", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      const recording = await storage.getRecording(recordingId);

      if (!recording || !fs.existsSync(recording.filePath)) {
        return res.sendStatus(404);
      }

      const stat = fs.statSync(recording.filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(recording.filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        };
        res.writeHead(200, head);
        fs.createReadStream(recording.filePath).pipe(res);
      }
    } catch (error) {
      console.error('Error streaming recording:', error);
      res.sendStatus(500);
    }
  });

  // Modificar la ruta de actualización de grabación para manejar mejor los estados
  app.patch("/api/recordings/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      const recording = await storage.getRecording(recordingId);

      if (!recording) {
        return res.sendStatus(404);
      }

      // Solo permitir actualizar estados válidos
      if (req.body.status && !['recording', 'completed', 'error'].includes(req.body.status)) {
        return res.status(400).json({ message: "Estado no válido" });
      }

      const updatedRecording = await storage.updateRecording(recordingId, req.body);
      res.json(updatedRecording);
    } catch (error) {
      console.error('Error updating recording:', error);
      res.status(500).json({ message: "Failed to update recording" });
    }
  });

  app.delete("/api/recordings/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      await storage.deleteRecording(recordingId);
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting recording:', error);
      res.sendStatus(500);
    }
  });

  app.get("/api/recordings/:id/export", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      const recording = await storage.getRecording(recordingId);

      if (!recording || !fs.existsSync(recording.filePath)) {
        return res.sendStatus(404);
      }

      // Configurar headers para la descarga
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="recording_${recording.id}.mp4"`);

      // Crear un stream de lectura y enviarlo como respuesta
      const fileStream = fs.createReadStream(recording.filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error exporting recording:', error);
      res.sendStatus(500);
    }
  });


  // Ruta para iniciar el análisis de IA
  app.post("/api/recordings/:id/analyze", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const recordingId = parseInt(req.params.id);
      const analysisId = req.body.analysisId;
      const recording = await storage.getRecording(recordingId);

      if (!recording || !fs.existsSync(recording.filePath)) {
        return res.status(404).json({ message: "Grabación no encontrada" });
      }

      console.log(`Iniciando análisis para grabación ${recordingId} con ID de análisis ${analysisId}`);

      // Iniciar el análisis en background
      analyzeVideo(recording.filePath, analysisId)
        .then(async (analysis) => {
          console.log(`Análisis completado para grabación ${recordingId}`, analysis);
          await storage.updateRecording(recordingId, { aiAnalysis: analysis });
        })
        .catch(error => {
          console.error(`Error en el análisis de la grabación ${recordingId}:`, error);
        });

      res.status(202).json({ message: "Análisis iniciado" });
    } catch (error) {
      console.error('Error iniciando análisis:', error);
      res.status(500).json({ message: "Error al iniciar el análisis" });
    }
  });

  // Ruta para obtener el progreso del análisis
  app.get("/api/analysis/:analysisId/progress", async (req, res) => {
    try {
      const analysisId = req.params.analysisId;
      console.log(`Consultando progreso del análisis ${analysisId}`);

      const progress = getAnalysisProgress(analysisId);
      if (!progress) {
        console.log(`No se encontró progreso para el análisis ${analysisId}`);
        return res.status(404).json({ message: "Análisis no encontrado" });
      }

      console.log(`Progreso del análisis ${analysisId}:`, progress);
      res.json({
        progress: progress.progress || 0,
        status: progress.status,
        framesAnalyzed: progress.framesAnalyzed,
        totalFrames: progress.totalFrames,
        errorMessage: progress.errorMessage
      });
    } catch (error) {
      console.error('Error obteniendo progreso del análisis:', error);
      res.status(500).json({ message: "Error al obtener el progreso" });
    }
  });

  return httpServer;
}



async function analyzeVideo(filePath: string, analysisId: string): Promise<any> {
  console.log(`Simulating AI analysis for ${filePath} with ID ${analysisId}`);
  analysisProgress.set(analysisId, { progress: 0, status: 'processing', framesAnalyzed: 0, totalFrames: 100, errorMessage: null });

  for (let i = 0; i < 100; i++) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate work
    analysisProgress.set(analysisId, { 
      progress: i + 1, 
      status: i === 99 ? 'completed' : 'processing',
      framesAnalyzed: i + 1,
      totalFrames: 100,
      errorMessage: null
    });
  }

  console.log(`Análisis completado para grabación con ID ${analysisId}`);
  return { 
    description: "Se detectó una persona caminando en el área de monitoreo. La persona parece estar realizando actividades normales sin comportamientos sospechosos.",
    tags: ["movimiento", "personas", "actividad normal", "interior"],
    keyEvents: [
      "Persona detectada en el área", 
      "Movimiento normal detectado",
      "Sin incidentes sospechosos"
    ],
    timestamp: new Date()
  };
}

function getAnalysisProgress(analysisId: string): { progress: number; status: string; framesAnalyzed: number; totalFrames: number; errorMessage: string | null } | undefined {
  return analysisProgress.get(analysisId);
}