# Sistema de Gestión de Cámaras IP

## Descripción General
Sistema avanzado de gestión de cámaras IP con funcionalidades de monitoreo en tiempo real, grabación personalizada y persistencia de datos.

### Características Principales
- Monitoreo en tiempo real de múltiples cámaras IP
- Grabación con etiquetado personalizado
- Estadísticas de rendimiento de cámaras
- Reproducción rápida de grabaciones recientes
- Interfaz moderna y responsiva
- Sistema de métricas en tiempo real

## Tecnologías Utilizadas
- Frontend: React/TypeScript con shadcn/ui
- Backend: Node.js con Express
- Streaming: ffmpeg para procesamiento de video
- Persistencia: Sistema de archivos JSON
- WebSockets para comunicación en tiempo real

## Estructura del Proyecto
```
├── client/          # Frontend React
├── server/          # Backend Node.js
├── shared/          # Types compartidos
├── data/           # Datos persistentes
├── recordings/     # Grabaciones y thumbnails
└── doc/            # Documentación
```
