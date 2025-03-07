import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define available roles
export const UserRole = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  VIEWER: 'viewer'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default(UserRole.VIEWER),
  fullName: text("full_name"),
  email: text("email"),
  lastLogin: timestamp("last_login"),
  preferences: jsonb("preferences").default({}),
});

// Definir el tipo de métricas
export type CameraMetrics = {
  fps: number;
  bitrate: number;
  resolution: string;
  uptime: number;
  connectionErrors: number;
  lastErrorTime: string | null;
  lastErrorMessage: string | null;
};

export const cameras = pgTable("cameras", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ipAddress: text("ip_address").notNull(),
  username: text("username").notNull().default("admin"),
  password: text("password").notNull().default("admin123"),
  streamPath: text("stream_path").notNull().default("h264Preview_01_main"),
  port: text("port").notNull().default("554"),
  isRecording: boolean("is_recording").notNull().default(false),
  userId: integer("user_id").notNull(),
  recordingPrefix: text("recording_prefix"),
  lastSeen: timestamp("last_seen"),
  status: text("status").default("disconnected"), // connected, disconnected, error
  metrics: jsonb("metrics").default({
    fps: 0,
    bitrate: 0,
    resolution: "",
    uptime: 0,
    connectionErrors: 0,
    lastErrorTime: null,
    lastErrorMessage: null
  }) as unknown as CameraMetrics,
});

// Tipo para el análisis de IA
export type VideoAnalysis = {
  description: string;
  tags: string[];
  keyEvents: string[];
  timestamp: Date;
};

export const recordings = pgTable("recordings", {
  id: serial("id").primaryKey(),
  cameraId: integer("camera_id").notNull(),
  filePath: text("file_path").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status").notNull().default("recording"), // recording, completed, error
  title: text("title"),
  description: text("description"),
  tags: text("tags").array(),
  aiAnalysis: jsonb("ai_analysis").$type<VideoAnalysis>(), // Nuevo campo para el análisis de IA
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  fullName: true,
  email: true,
});

export const insertCameraSchema = createInsertSchema(cameras).pick({
  name: true,
  ipAddress: true,
  username: true,
  password: true,
  streamPath: true,
  port: true,
  recordingPrefix: true,
});

export const insertRecordingSchema = createInsertSchema(recordings).pick({
  cameraId: true,
  filePath: true,
  startTime: true,
  title: true,
  description: true,
  tags: true,
}).extend({
  tags: z.array(z.string()).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

// Definir tipos para sensores
export type SensorMetrics = {
  battery: number;
  linkQuality: number;
  lastUpdate: string;
  status: 'online' | 'offline' | 'error';
};

export type SensorConfig = {
  topic: string;
  deviceId: string;
  model: string;
  manufacturer: string;
};

export const sensors = pgTable("sensors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // temperature, humidity, motion, etc.
  location: text("location"),
  userId: integer("user_id").notNull(),
  isEnabled: boolean("is_enabled").notNull().default(true),
  lastSeen: timestamp("last_seen"),
  config: jsonb("config").$type<SensorConfig>().notNull(),
  metrics: jsonb("metrics").$type<SensorMetrics>().default({
    battery: 100,
    linkQuality: 0,
    lastUpdate: new Date().toISOString(),
    status: 'offline'
  }),
});

export const sensorEvents = pgTable("sensor_events", {
  id: serial("id").primaryKey(),
  sensorId: integer("sensor_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  eventType: text("event_type").notNull(), // reading, alert, status_change
  data: jsonb("data").notNull(),
});

export const insertSensorSchema = createInsertSchema(sensors).pick({
  name: true,
  type: true,
  location: true,
  userId: true,
  config: true,
}).extend({
  config: z.object({
    topic: z.string(),
    deviceId: z.string(),
    model: z.string(),
    manufacturer: z.string(),
  })
});

export const insertSensorEventSchema = createInsertSchema(sensorEvents).pick({
  sensorId: true,
  eventType: true,
  data: true,
});

// Types for the new schemas
export type InsertSensor = z.infer<typeof insertSensorSchema>;
export type Sensor = typeof sensors.$inferSelect;
export type SensorEvent = typeof sensorEvents.$inferSelect;
export type InsertSensorEvent = z.infer<typeof insertSensorEventSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCamera = z.infer<typeof insertCameraSchema>;
export type Camera = typeof cameras.$inferSelect;
export type Recording = typeof recordings.$inferSelect;
export type InsertRecording = z.infer<typeof insertRecordingSchema>;

export function buildRtspUrl(camera: Camera): string {
  const streamPath = camera.streamPath || 'h264Preview_01_main';
  return `rtsp://${camera.username}:${camera.password}@${camera.ipAddress}:${camera.port}/${streamPath}`;
}