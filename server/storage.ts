import { User, InsertUser, Camera, InsertCamera, Recording, InsertRecording, CameraMetrics, Sensor, InsertSensor, SensorEvent, InsertSensorEvent } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import fs from "fs";
import path from "path";

const MemoryStore = createMemoryStore(session);

// Asegurar que existen los directorios necesarios
const RECORDINGS_DIR = path.join(process.cwd(), "recordings");
const DATA_DIR = path.join(process.cwd(), "data");

// Crear directorios con permisos explícitos
if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true, mode: 0o755 });
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o755 });
}

const USERS_FILE = path.join(DATA_DIR, "users.json");
const CAMERAS_FILE = path.join(DATA_DIR, "cameras.json");
const RECORDINGS_FILE = path.join(DATA_DIR, "recordings.json");
const SENSORS_FILE = path.join(DATA_DIR, "sensors.json");
const SENSOR_EVENTS_FILE = path.join(DATA_DIR, "sensor_events.json");

// Inicializar archivos JSON si no existen
[USERS_FILE, CAMERAS_FILE, RECORDINGS_FILE, SENSORS_FILE, SENSOR_EVENTS_FILE].forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '{}', { mode: 0o644 });
  }
});

// Función helper para guardar datos en archivo JSON
function saveToJSON(file: string, data: any) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), { mode: 0o644 });
    console.log(`Datos guardados en ${file}`);
  } catch (error) {
    console.error(`Error guardando en ${file}:`, error);
  }
}

// Función helper para cargar datos desde archivo JSON
function loadFromJSON(file: string): any {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      const parsedData = JSON.parse(data);
      console.log(`Datos cargados desde ${file}`);
      return parsedData;
    }
  } catch (error) {
    console.error(`Error cargando ${file}:`, error);
  }
  return {};
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, update: Partial<User>): Promise<User>;

  getCameras(userId: number): Promise<Camera[]>;
  getCamera(id: number): Promise<Camera | undefined>;
  createCamera(camera: InsertCamera & { userId: number }): Promise<Camera>;
  updateCamera(id: number, camera: Partial<Camera>): Promise<Camera>;
  deleteCamera(id: number): Promise<void>;

  getRecordings(cameraId: number): Promise<Recording[]>;
  createRecording(recording: InsertRecording): Promise<Recording>;
  updateRecording(id: number, update: Partial<Recording>): Promise<Recording>;
  getRecording(id: number): Promise<Recording | undefined>;
  deleteRecording(id: number): Promise<void>;

  sessionStore: session.Store;
  getMetrics(): Promise<{
    timestamp: string;
    fps: number;
    bitrate: number;
    connectionErrors: number;
  }[]>;

  // Nuevos métodos para sensores
  getSensors(userId: number): Promise<Sensor[]>;
  getSensor(id: number): Promise<Sensor | undefined>;
  createSensor(sensor: InsertSensor & { userId: number }): Promise<Sensor>;
  updateSensor(id: number, sensor: Partial<Sensor>): Promise<Sensor>;
  deleteSensor(id: number): Promise<void>;

  // Métodos para eventos de sensores
  getSensorEvents(sensorId: number): Promise<SensorEvent[]>;
  createSensorEvent(event: InsertSensorEvent): Promise<SensorEvent>;
  getSensorEvent(id: number): Promise<SensorEvent | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cameras: Map<number, Camera>;
  private recordings: Map<number, Recording>;
  private sensors: Map<number, Sensor>;
  private sensorEvents: Map<number, SensorEvent>;
  private currentUserId: number;
  private currentCameraId: number;
  private currentRecordingId: number;
  private currentSensorId: number;
  private currentSensorEventId: number;
  sessionStore: session.Store;

  constructor() {
    console.log('Inicializando MemStorage...');

    // Cargar datos desde archivos JSON
    const usersData = loadFromJSON(USERS_FILE);
    const camerasData = loadFromJSON(CAMERAS_FILE);
    const recordingsData = loadFromJSON(RECORDINGS_FILE);
    const sensorsData = loadFromJSON(SENSORS_FILE);
    const sensorEventsData = loadFromJSON(SENSOR_EVENTS_FILE);

    // Convertir los objetos a Maps con estado inicial correcto
    this.users = new Map(Object.entries(usersData).map(([id, user]) => [Number(id), user as User]));

    // Inicializar cámaras con estado disconnected por defecto
    this.cameras = new Map(Object.entries(camerasData).map(([id, camera]) => {
      const cam = camera as Camera;
      return [Number(id), {
        ...cam,
        status: 'disconnected',
        isRecording: false,
        lastSeen: null,
        metrics: {
          fps: 0,
          bitrate: 0,
          resolution: '',
          uptime: 0,
          connectionErrors: 0,
          lastErrorTime: null,
          lastErrorMessage: null
        }
      }];
    }));

    this.recordings = new Map(Object.entries(recordingsData).map(([id, recording]) => [Number(id), recording as Recording]));
    this.sensors = new Map(Object.entries(sensorsData).map(([id, sensor]) => [Number(id), sensor as Sensor]));
    this.sensorEvents = new Map(Object.entries(sensorEventsData).map(([id, event]) => [Number(id), event as SensorEvent]));

    // Establecer IDs iniciales
    this.currentUserId = Math.max(0, ...Array.from(this.users.keys())) + 1;
    this.currentCameraId = Math.max(0, ...Array.from(this.cameras.keys())) + 1;
    this.currentRecordingId = Math.max(0, ...Array.from(this.recordings.keys())) + 1;
    this.currentSensorId = Math.max(0, ...Array.from(this.sensors.keys())) + 1;
    this.currentSensorEventId = Math.max(0, ...Array.from(this.sensorEvents.keys())) + 1;

    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Guardar estado inicial
    this.saveState();
  }

  private saveState() {
    console.log('Guardando estado...');
    saveToJSON(USERS_FILE, Object.fromEntries(this.users));
    saveToJSON(CAMERAS_FILE, Object.fromEntries(this.cameras));
    saveToJSON(RECORDINGS_FILE, Object.fromEntries(this.recordings));
    saveToJSON(SENSORS_FILE, Object.fromEntries(this.sensors));
    saveToJSON(SENSOR_EVENTS_FILE, Object.fromEntries(this.sensorEvents));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    this.saveState();
    return user;
  }

  async updateUser(id: number, update: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, ...update };
    this.users.set(id, updatedUser);
    this.saveState();
    return updatedUser;
  }

  async getCameras(userId: number): Promise<Camera[]> {
    return Array.from(this.cameras.values()).filter(
      (camera) => camera.userId === userId
    );
  }

  async getCamera(id: number): Promise<Camera | undefined> {
    return this.cameras.get(id);
  }

  async createCamera(camera: InsertCamera & { userId: number }): Promise<Camera> {
    const id = this.currentCameraId++;
    const newCamera: Camera = {
      ...camera,
      id,
      isRecording: false,
      status: 'disconnected',
      lastSeen: null,
      metrics: {
        fps: 0,
        bitrate: 0,
        resolution: '',
        uptime: 0,
        connectionErrors: 0,
        lastErrorTime: null,
        lastErrorMessage: null
      }
    };
    this.cameras.set(id, newCamera);
    this.saveState();
    return newCamera;
  }

  async updateCamera(id: number, update: Partial<Camera>): Promise<Camera> {
    const camera = this.cameras.get(id);
    if (!camera) {
      throw new Error("Camera not found");
    }

    let updatedCamera: Camera;
    const now = new Date();

    // Si estamos actualizando el estado
    if (update.status) {
      if (update.status === 'connected') {
        // Cámara conectada
        updatedCamera = {
          ...camera,
          ...update,
          lastSeen: now,
          metrics: {
            fps: 30,
            bitrate: 2000,
            resolution: '1920x1080',
            uptime: (camera.metrics?.uptime || 0) + 1,
            connectionErrors: camera.metrics?.connectionErrors || 0,
            lastErrorTime: null,
            lastErrorMessage: null
          }
        };
      } else {
        // Cámara desconectada o con error
        updatedCamera = {
          ...camera,
          ...update,
          isRecording: false,
          lastSeen: now,
          metrics: {
            fps: 0,
            bitrate: 0,
            resolution: '',
            uptime: 0,
            connectionErrors: (camera.metrics?.connectionErrors || 0) + 1,
            lastErrorTime: now.toISOString(),
            lastErrorMessage: update.status === 'error' ? 'Error de conexión' : 'Cámara desconectada'
          }
        };
      }
    } else {
      // Otras actualizaciones mantienen el estado actual
      updatedCamera = {
        ...camera,
        ...update,
        lastSeen: now
      };
    }

    this.cameras.set(id, updatedCamera);
    this.saveState();
    return updatedCamera;
  }

  async deleteCamera(id: number): Promise<void> {
    // Eliminar todas las grabaciones asociadas
    const recordings = Array.from(this.recordings.values())
      .filter(recording => recording.cameraId === id);

    for (const recording of recordings) {
      try {
        if (fs.existsSync(recording.filePath)) {
          fs.unlinkSync(recording.filePath);
        }
        this.recordings.delete(recording.id);
      } catch (error) {
        console.error(`Error deleting recording ${recording.id}:`, error);
      }
    }

    this.cameras.delete(id);
    this.saveState();
  }

  async getRecordings(cameraId: number): Promise<Recording[]> {
    return Array.from(this.recordings.values())
      .filter(recording => recording.cameraId === cameraId)
      .map(recording => ({
        ...recording,
        startTime: new Date(recording.startTime),
        endTime: recording.endTime ? new Date(recording.endTime) : null
      }))
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  async createRecording(recording: InsertRecording): Promise<Recording> {
    const camera = await this.getCamera(recording.cameraId);
    if (!camera) {
      throw new Error("Camera not found");
    }

    const id = this.currentRecordingId++;
    const now = new Date();
    const newRecording: Recording = {
      ...recording,
      id,
      status: "recording",
      endTime: null,
      title: recording.title || null,
      description: recording.description || null,
      tags: recording.tags || [],
      aiAnalysis: null
    };

    // Actualizar estado de la cámara
    await this.updateCamera(recording.cameraId, {
      isRecording: true,
      lastSeen: now
    });

    this.recordings.set(id, newRecording);
    this.saveState();
    return newRecording;
  }

  async updateRecording(id: number, update: Partial<Recording>): Promise<Recording> {
    const recording = this.recordings.get(id);
    if (!recording) {
      throw new Error("Recording not found");
    }
    const updatedRecording = { ...recording, ...update };
    this.recordings.set(id, updatedRecording);
    this.saveState();
    return updatedRecording;
  }

  async getRecording(id: number): Promise<Recording | undefined> {
    return this.recordings.get(id);
  }

  async deleteRecording(id: number): Promise<void> {
    const recording = await this.getRecording(id);
    if (!recording) {
      throw new Error("Recording not found");
    }

    try {
      if (fs.existsSync(recording.filePath)) {
        fs.unlinkSync(recording.filePath);

        // Eliminar la miniatura si existe
        const thumbnailPath = path.join(
          process.cwd(),
          "recordings",
          "thumbnails",
          `${path.basename(recording.filePath)}.thumb.jpg`
        );
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
      }
      this.recordings.delete(id);
      this.saveState();
    } catch (error) {
      console.error(`Error deleting recording ${id}:`, error);
      throw error;
    }
  }

  async getMetrics(): Promise<{
    timestamp: string;
    fps: number;
    bitrate: number;
    connectionErrors: number;
  }[]> {
    // Generar datos de métricas de todas las cámaras
    const cameras = Array.from(this.cameras.values());

    // Crear un array de las últimas 24 horas con intervalos de 1 hora
    const metrics = Array.from({ length: 24 }, (_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - i);

      // Calcular promedios de todas las cámaras
      const avgFps = cameras.reduce((sum, cam) => sum + ((cam.metrics && typeof cam.metrics === 'object' && 'fps' in cam.metrics) ? cam.metrics.fps : 0), 0) / Math.max(cameras.length, 1);
      const avgBitrate = cameras.reduce((sum, cam) => sum + ((cam.metrics && typeof cam.metrics === 'object' && 'bitrate' in cam.metrics) ? cam.metrics.bitrate : 0), 0) / Math.max(cameras.length, 1);
      const totalErrors = cameras.reduce((sum, cam) => sum + ((cam.metrics && typeof cam.metrics === 'object' && 'connectionErrors' in cam.metrics) ? cam.metrics.connectionErrors : 0), 0);

      // Asegurarnos de que los valores son números y añadir algo de variación para simular datos reales
      return {
        timestamp: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        fps: Number((30 + Math.random() * 5).toFixed(2)), // Simular FPS entre 30-35
        bitrate: Number((2000 + Math.random() * 1000).toFixed(2)), // Simular bitrate entre 2000-3000 kbps
        connectionErrors: Math.round(totalErrors + (Math.random() > 0.8 ? 1 : 0)) // Ocasionalmente añadir errores
      };
    }).reverse(); // Revertir para mostrar en orden cronológico

    return metrics;
  }

  // Implementación de métodos para sensores
  async getSensors(userId: number): Promise<Sensor[]> {
    return Array.from(this.sensors.values()).filter(
      (sensor) => sensor.userId === userId
    );
  }

  async getSensor(id: number): Promise<Sensor | undefined> {
    return this.sensors.get(id);
  }

  async createSensor(sensor: InsertSensor & { userId: number }): Promise<Sensor> {
    const id = this.currentSensorId++;
    const now = new Date();
    const newSensor: Sensor = {
      ...sensor,
      id,
      isEnabled: true,
      lastSeen: null,
      metrics: {
        battery: 100,
        linkQuality: 0,
        lastUpdate: now.toISOString(),
        status: 'offline'
      }
    };
    this.sensors.set(id, newSensor);
    this.saveState();
    return newSensor;
  }

  async updateSensor(id: number, update: Partial<Sensor>): Promise<Sensor> {
    const sensor = this.sensors.get(id);
    if (!sensor) {
      throw new Error("Sensor not found");
    }
    const updatedSensor = { ...sensor, ...update };
    this.sensors.set(id, updatedSensor);
    this.saveState();
    return updatedSensor;
  }

  async deleteSensor(id: number): Promise<void> {
    // Eliminar todos los eventos asociados
    const events = Array.from(this.sensorEvents.values())
      .filter(event => event.sensorId === id);

    for (const event of events) {
      this.sensorEvents.delete(event.id);
    }

    this.sensors.delete(id);
    this.saveState();
  }

  // Implementación de métodos para eventos de sensores
  async getSensorEvents(sensorId: number): Promise<SensorEvent[]> {
    return Array.from(this.sensorEvents.values())
      .filter(event => event.sensorId === sensorId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async createSensorEvent(event: InsertSensorEvent): Promise<SensorEvent> {
    const id = this.currentSensorEventId++;
    const newEvent: SensorEvent = {
      ...event,
      id,
      timestamp: new Date().toISOString()
    };
    this.sensorEvents.set(id, newEvent);
    this.saveState();
    return newEvent;
  }

  async getSensorEvent(id: number): Promise<SensorEvent | undefined> {
    return this.sensorEvents.get(id);
  }
}

export const storage = new MemStorage();