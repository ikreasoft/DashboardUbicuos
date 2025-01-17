# Proyecto: **Dashboard Just Move - Ubicuos**
## 🤔 **Acerca del Proyecto**

Este proyecto se enfoca en desarrollar un sistema de monitoreo y control basado en IoT, que permite la captura y almacenamiento de datos de sensores, visualización en tiempo real, y gestión remota de actuadores. Su propósito principal es optimizar recursos y mejorar la eficiencia operativa, automatizando procesos y proporcionando un entorno seguro para la transmisión de datos.

**Motivación**: La creciente importancia de los sistemas IoT en la automatización impulsa la necesidad de gestionar grandes volúmenes de datos de sensores y actuar en tiempo real. Este proyecto busca ofrecer una solución completa que facilite la administración y el monitoreo en entornos conectados.

<div align="center">
  <!-- Change your logo -->
  <a href="https://github.com/ikreasoft/DashboardUbicuos">
    <img width="100%" src="https://www.uclm.es/-/media/Files/C01-Centros/ITSI/secciones-investigacion/MaMl.ashx?la=es" alt="@ikreasoft/DashboardUbicuos's logo">
  </a>
  <br>
  <a href="https://github.com/ikreasoft/DashboardUbicuos/issues">
    <img src="https://img.shields.io/github/issues/ikreasoft/DashboardUbicuos?color=0088ff&style=for-the-badge&logo=github" alt="ikreasoft/DashboardUbicuos's issues"/>
  </a>
  <a href="https://github.com/ikreasoft/DashboardUbicuos/pulls">
    <img src="https://img.shields.io/github/issues-pr/ikreasoft/DashboardUbicuos?color=0088ff&style=for-the-badge&logo=github"  alt="ikreasoft/DashboardUbicuos's pull requests"/>
  </a>
</div>
</div>

---

**Objetivos**:
1. Integrar sensores y actuadores para monitorear condiciones ambientales y gestionar recursos de manera remota.
2. Crear un dashboard interactivo para la visualización de métricas en tiempo real.
---
*Extras*
3. Garantizar la seguridad en la autenticación y la gestión de usuarios, protegiendo la integridad de los datos.

---

## ⚡ **Instalación**

### Requisitos previos:
- **Node.js** v20.18.0
- **Docker** v27.2.0
- **Kubernetes** v1.31.1+k3s1 (para despliegue en producción)
- **MongoDB Atlas** y **InfluxDB** (con instancias en la nube o locales)
- **MQTT Broker** (para transmisión de mensajes entre sensores y actuadores)

### Pasos de instalación:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ikreasoft/DashboardUbicuos.git
   cd project
   ```

2. **Instalar dependencias del backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Instalar dependencias del frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configurar variables de entorno** en `.env`:
   ```bash
   MONGO_URI=your-mongodb-uri
   INFLUXDB_URL=your-influxdb-url
   MQTT_BROKER=your-mqtt-broker-url
   ```

5. **Inicializar contenedores en Docker**:
   ```bash
   docker-compose up -d
   ```

6. **Iniciar Kubernetes** (opcional para producción):
   ```bash
   kubectl apply -f k8s-deployment.yml
   ```

---

## 🚀 **Uso**

Para acceder al **dashboard**, abre `http://localhost:3000`:

- **Monitoreo** de datos en tiempo real de sensores IoT.
- **Gestión remota de actuadores**: encendido y apagado de dispositivos.
- **Almacenamiento de series temporales** y datos estructurados en InfluxDB y MongoDB.
  
### Comandos adicionales:
- **Simular datos** de sensores:
   ```bash
   python scripts/generate_data.py
   ```

- **Monitorear con MQTT**:
   Ejecutar scripts de monitoreo para verificar la transmisión de mensajes.

---

## 🌲 **Estructura del Proyecto**

```
project/
├── backend/                   # API en Node.js
│   ├── controllers/           # Controladores de rutas
│   ├── models/                # Modelos de MongoDB, InfluxDB
│   ├── routes/                # Rutas API
│   └── app.js                 # Archivo principal
│
├── frontend/                  # Interfaz gráfica en React.js
│   ├── public/                # Archivos estáticos
│   ├── src/                   # Código fuente
│   └── index.js               # Punto de entrada del frontend
│
├── scripts/                   # Scripts para simulación
│   └── generate_data.py       # Generador de datos de sensores IoT
│
└── README.md                  # Documentación
```

---

## 📝 **Notas Adicionales**

- La configuración de red y los dispositivos (como Raspberry Pi, Orange Pi) deben estar operativos antes de iniciar el sistema.
- El sistema se puede configurar para monitorización remota mediante VPN y protocolos de seguridad adicionales.

---

## 📸 **Capturas**

1. **Dashboard principal**:
   ![Dashboard](https://camo.githubusercontent.com/7cc86f6a0e78de69f73e17a49bf21ac59106e898133f86541ac16ef12b76a20d/68747470733a2f2f666c6f77626974652e73332e616d617a6f6e6177732e636f6d2f74656d706c617465732f666c6f77626974652d61646d696e2d64617368626f6172642f666c6f77626974652d61646d696e2d64617368626f6172642d707265766965772e706e67)

2. **Datos de sensores**:
   ![Sensores](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41598-021-01431-y/MediaObjects/41598_2021_1431_Fig1_HTML.png)

3. **Video en tiempo real**:
   ![Cámaras IP](https://m.media-amazon.com/images/I/51O0WS4JOrL._AC_UF894,1000_QL80_.jpg)

