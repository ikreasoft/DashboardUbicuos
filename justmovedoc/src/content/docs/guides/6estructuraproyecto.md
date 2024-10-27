---
title: Diagrama general proyecto 🗂️
description: Mapa del proyecto Just Move.
cover: ../../../assets/img/project/Plan-de-negocios.png
---


**Diagrama General del Proyecto**:

- Muestra las capas principales del sistema
- Visualiza el flujo de datos entre componentes
- Incluye todos los elementos software principales

[![diagrama general del proyecto](../../../assets/img/schemas/infraDiagram.png)](https://drive.google.com/file/d/1v2a4tjJZEsRwuvMvf2zrYCt2wSmz_FLU/view?usp=sharing)

Algunas **características** importantes representadas:

- QoS a través del broker MQTT
- Separación entre datos temporales (InfluxDB) y persistentes (MongoDB)
- Flujo de datos desde los sensores hasta el frontend
- Arquitectura de red con Switch PoE y Router Wifi