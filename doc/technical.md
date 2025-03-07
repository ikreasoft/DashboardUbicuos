# Documentación Técnica

## Arquitectura del Sistema

### Frontend (React/TypeScript)
- **React**: Framework principal para UI
- **TypeScript**: Tipado estático
- **shadcn/ui**: Componentes UI
- **TanStack Query**: Gestión de estado y caché
- **WebSocket**: Comunicación en tiempo real

### Backend (Node.js)
- **Express**: Framework web
- **ffmpeg**: Procesamiento de video
- **WebSocket**: Streaming de video
- **JSON Storage**: Persistencia de datos

## Componentes Principales

### Sistema de Cámaras
- Gestión de conexiones RTSP
- Streaming en tiempo real
- Grabación y almacenamiento

### Sistema de Grabación
- Etiquetado de videos
- Nomenclatura personalizada
- Gestión de almacenamiento

### Monitoreo de Rendimiento
- Métricas en tiempo real
- Estadísticas de cámaras
- Dashboard de rendimiento

## Flujos de Datos
1. **Streaming de Video**
   - Conexión RTSP -> ffmpeg -> WebSocket -> Cliente
   
2. **Grabación**
   - Cliente -> API -> ffmpeg -> Sistema de archivos

3. **Métricas**
   - Cámara -> Backend -> WebSocket -> Dashboard
