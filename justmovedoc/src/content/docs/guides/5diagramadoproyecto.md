---
title: Diagrama de despliegue infraestructura 🚀
description: He generado el **Deployment Diagram** para el Living Lab con la arquitectura que detalla la disposición de dispositivos y las conexiones entre ellos. 
cover: ../../../assets/img/project/Plan-de-negocios.png
---

El diagrama se estructura con los siguientes componentes:

- **Router WiFi**: Actúa como nodo central para las comunicaciones.
- **Switch PoE**: Distribuye la energía y la red a las cámaras IP Reolink.
- **Orange Pi 5**: Nodo central de procesamiento y conexión a las bases de datos.
- **Raspberry Pi 3b**: Dispositivo adicional de soporte.
- **Cluster de Sensores Zigbee**: Para la recopilación de datos.
- **Cámaras IP Reolink**: Conectadas al switch mediante PoE.
- **InfluxDB**: Base de datos para series temporales.
- **MongoDB Atlas**: Almacenamiento permanente para datos no temporales.

El archivo de la representación visual de este diagrama está listo para visualizarse:

.![[LivingLab_Deployment.png]](../../../assets/img/schemas/LivingLab_Deployment.png)


El **Component Diagram** para la base de datos **MongoDB Atlas**. 
El diagrama incluye los siguientes componentes y relaciones:

- **MongoDB Atlas**: Base de datos central.
- **API RESTful en Node.js y Express**: Maneja las operaciones CRUD hacia MongoDB.
- **Data Processor (Simulación en Python)**: Envía datos simulados a la API para ser almacenados.
- **Frontend React (Dashboard)**: Consulta datos almacenados mediante operaciones GET.

Puedes visualizar la representación de este diagrama aquí:

![[MongoDB_Component.png]](../../../assets/img/schemas/MongoDB_Component.png)


El **Component Diagram** para la base de datos **InfluxDB**. 
El diagrama muestra los siguientes componentes y sus relaciones:

- **InfluxDB**: Base de datos especializada en series temporales.
- **API InfluxDB en Node.js y Express**: Maneja las operaciones CRUD hacia InfluxDB.
- **Data Processor (Simulación en Python)**: Envía series temporales a la API para su almacenamiento.
- **Grafana**: Se conecta directamente a InfluxDB para realizar consultas de series temporales y visualizarlas.

Puedes visualizar la representación de este diagrama aquí:

![[InfluxDB_Component.png]](../../../assets/img/schemas/InfluxDB_Component.png)

El **Sequence Diagram** del frontend, que muestra la interacción entre el usuario y los componentes del sistema:

1. El **usuario** solicita acceso al Dashboard React.
2. El **frontend React** consulta datos a la API RESTful.
3. La **API** consulta la base de datos **MongoDB** para datos permanentes.
4. La API también consulta **InfluxDB** para obtener series temporales.
5. MongoDB e InfluxDB envían sus respuestas a la API.
6. La API reenvía la respuesta completa al frontend.
7. El **usuario** visualiza la información en el dashboard.

Puedes visualizar la representación del diagrama aquí:

![[Frontend_Sequence.png]](../../../assets/img/schemas/Frontend_Sequence.png)

El **Class Diagram** para la **API RESTful**. 
El diagrama incluye las siguientes clases y relaciones:

- **Clases**:
  - `Device`: Representa un dispositivo en el sistema con sus atributos (`_id`, `type`, `status`, `timestamp`).
  - `User`: Usuario del sistema con atributos como `username`, `password`, y `role`.
  - `Sensor`: Asociado a los dispositivos y contiene información sobre los sensores (nombre, valor).

- **Controladores (Controllers)**:
  - `DeviceController`: Realiza operaciones CRUD para los dispositivos.
  - `UserController`: Maneja la autenticación y registro de usuarios.

- **Relaciones**:
  - `DeviceController` se conecta con `Device` para operaciones CRUD.
  - `UserController` se conecta con `User` para autenticación.
  - La clase `Device` contiene uno o más `Sensor` en su estructura.

Puedes visualizar el diagrama aquí:

![[API_Class.png]](../../../assets/img/schemas/API_Class.png)

E **Interaction Diagram** para el sistema **MQTT**, que muestra cómo se comunican los dispositivos IoT con el resto del sistema:

1. Los **dispositivos IoT** publican mensajes en diferentes *topics* del **broker MQTT**.
2. El **broker** envía los datos de los *topics* suscritos a la **API RESTful**.
3. La **API** almacena los datos y envía actualizaciones al **frontend React**.
4. El **frontend** consulta el estado actualizado cuando es necesario.

Puedes visualizar el diagrama aquí:

![[MQTT_Interaction.png]](../../../assets/img/schemas/MQTT_Interaction.png)

El **Class Diagram** para el **backend** del sistema. Este diagrama incluye las siguientes clases y sus interacciones:

- **DatabaseConnection**: Clase que maneja la conexión con la base de datos y permite realizar consultas.
- **MQTTService**: Interfaz que gestiona la suscripción y publicación de mensajes en *topics* MQTT.
- **DataProcessor**: Procesa los datos recibidos y los almacena mediante el servicio MQTT.
- **APIGateway**: Punto de acceso principal que recibe las solicitudes del cliente y las enruta a los servicios correspondientes.

Puedes visualizar el diagrama aquí:

![[Backend_Class.png]](../../../assets/img/schemas/Backend_Class.png)

El **Activity Diagram** para el sistema de **QoS (Calidad de Servicio)**. El diagrama muestra el flujo de actividades para monitorear y optimizar la calidad del servicio:

1. **Inicio** del proceso de monitoreo.
2. **Monitoreo del consumo de recursos** del sistema.
3. Verificación de la **latencia de red**:
   - Si la latencia es alta, se ejecuta la **optimización de parámetros de red**.
   - Si la latencia es normal, se pasa a verificar el **consumo energético**.
4. Si el consumo energético es alto, se procede a **reducir el consumo de energía**.
5. Si el consumo energético es normal o se ha optimizado la red, se genera una **alerta de QoS**.
6. Fin del proceso.

Puedes visualizar la representación aquí:

![[QoS_Activity.png]](../../../assets/img/schemas/QoS_Activity.png)
