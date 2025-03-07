# Sistema de Gestión de Cámaras IP

Sistema web para gestionar y visualizar cámaras IP con capacidades de visualización en tiempo real y grabación.

## Requisitos del Sistema

- Node.js 20 o superior
- NPM 10 o superior
- Una variable de entorno `SESSION_SECRET` para la autenticación

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd <nombre-del-directorio>
```

2. Instala las dependencias:
```bash
npm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y configura las variables de entorno:
```env
# Genera un valor aleatorio seguro para SESSION_SECRET
# Puedes usar: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=tu_secreto_aqui

# Otros ajustes
NODE_ENV=development
PORT=5000
```

3. Asegúrate de que todas las dependencias estén instaladas correctamente:
```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## Estructura del Proyecto

```
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilidades y configuración
│   │   └── pages/        # Páginas de la aplicación
├── server/                # Backend (Express + TypeScript)
│   ├── auth.ts           # Configuración de autenticación
│   ├── routes.ts         # Rutas de la API
│   ├── storage.ts        # Capa de almacenamiento
│   └── vite.ts           # Configuración de Vite
└── shared/               # Código compartido
    └── schema.ts         # Esquemas y tipos
```

## Funcionalidades Principales

### Autenticación
- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Gestión de roles (ADMIN, OPERATOR, VIEWER)

### Gestión de Cámaras
- Agregar nuevas cámaras IP
- Visualizar listado de cámaras
- Eliminar cámaras
- Control de grabación

### WebSocket
El sistema utiliza WebSockets para actualizaciones en tiempo real cuando:
- Se agrega una nueva cámara
- Se actualiza el estado de una cámara
- Se elimina una cámara

## API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cierre de sesión
- `GET /api/user` - Obtener usuario actual
- `PATCH /api/user/preferences` - Actualizar preferencias del usuario

### Cámaras
- `GET /api/cameras` - Obtener lista de cámaras
- `POST /api/cameras` - Agregar nueva cámara
- `PATCH /api/cameras/:id` - Actualizar cámara existente
- `DELETE /api/cameras/:id` - Eliminar cámara

## Desarrollo

Para desarrollo local, el proyecto utiliza:
- Vite para el frontend
- Express para el backend
- TypeScript para tipo seguro
- WebSocket para actualizaciones en tiempo real
- Zod para validación de datos
- React Query para manejo de estado y caché
- Shadcn UI para componentes de interfaz

### Variables de Entorno
El proyecto utiliza variables de entorno para la configuración. Asegúrate de:
1. Nunca comitear el archivo `.env` al control de versiones
2. Mantener `.env.example` actualizado con todas las variables necesarias
3. Generar un SESSION_SECRET seguro y único para cada instancia

## Contribución

1. Crea un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Próximas Características

- [ ] Sistema avanzado de grabación programada
- [ ] Análisis de video en tiempo real
- [ ] Sistema de notificaciones y alertas