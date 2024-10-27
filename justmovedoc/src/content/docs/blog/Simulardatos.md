---
title: Simulación de datos experimentales 📊
description: Datos IoT simulados del laboratorio
cover: ../../../assets/img/project/Plan-de-negocios.png
---


Para simular datos de dispositivos inteligentes en una configuración Dockerizada con Python 3, puedes seguir estos pasos generales para crear un entorno .env con Docker y Python para cada categoría de dispositivo inteligente que mencionas. Aquí tienes un esquema para comenzar:

### 1. Configuración Inicial: Estructura de Archivos

Crea una carpeta de proyecto con la siguiente estructura:

```sh
smart_home_simulator/
├── docker-compose.yml
├── .env
├── data_simulation/
│   ├── __init__.py
│   ├── lighting.py
│   ├── audio.py
│   ├── climate.py
│   ├── security.py
│   ├── appliances.py
│   ├── garage.py
│   └── irrigation.py
└── main.py
```

### 2. Definición del Entorno `.env`

En el archivo `.env`, define variables que puedas querer ajustar sin modificar el código directamente, como la frecuencia de simulación y los umbrales de los sensores. Aquí tienes un ejemplo de `.env`:

```env
SIMULATION_INTERVAL=5  # Intervalo en segundos
MAX_LIGHT_LEVEL=100
MAX_TEMPERATURE=30
MIN_TEMPERATURE=18
SECURITY_CAMERA_COUNT=4
```

### 3. Dockerfile y `docker-compose.yml`

Define el archivo Dockerfile y el archivo `docker-compose.yml` para construir y correr el contenedor de simulación:

**Dockerfile:**
```dockerfile
# Usa una imagen base de Python
FROM python:3.10-slim

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala las dependencias
RUN pip install -r requirements.txt

# Expone el puerto para la API o visualización, si es necesario
EXPOSE 5000

# Comando por defecto
CMD ["python", "main.py"]
```

**docker-compose.yml:**
```yaml
version: "3.8"

services:
  simulator:
    build: .
    env_file:
      - .env
    volumes:
      - .:/app
    ports:
      - "5000:5000"  # Opcional si usas una API o visualización
    container_name: smart_home_simulator
```

### 4. Definición de Simulación para Cada Dispositivo

Cada archivo en la carpeta `data_simulation/` representa un tipo de dispositivo. Cada archivo tiene una función para simular datos y devolver valores aleatorios dentro de un rango específico.

Ejemplo de simulación para `lighting.py` (Iluminación Inteligente):

```python
import random
import os

def simulate_lighting():
    max_light_level = int(os.getenv("MAX_LIGHT_LEVEL", 100))
    return {"light_level": random.randint(0, max_light_level)}
```

Ejemplo de `climate.py` (Termostato Inteligente):

```python
import random
import os

def simulate_climate():
    max_temp = int(os.getenv("MAX_TEMPERATURE", 30))
    min_temp = int(os.getenv("MIN_TEMPERATURE", 18))
    return {"temperature": random.uniform(min_temp, max_temp)}
```

Simulación de un dispositivo de seguridad (por ejemplo, `security.py`):

```python
import random

def simulate_security():
    return {
        "camera_activity": bool(random.getrandbits(1)),
        "motion_detected": bool(random.getrandbits(1))
    }
```

### 5. Archivo Principal `main.py`

Este archivo `main.py` ejecuta la simulación en intervalos configurados en `.env`, integrando cada dispositivo y mostrando o enviando los datos simulados a una API o archivo log.

```python
import time
import os
from data_simulation.lighting import simulate_lighting
from data_simulation.climate import simulate_climate
from data_simulation.security import simulate_security

SIMULATION_INTERVAL = int(os.getenv("SIMULATION_INTERVAL", 5))

def run_simulation():
    while True:
        # Simulaciones de dispositivos
        lighting_data = simulate_lighting()
        climate_data = simulate_climate()
        security_data = simulate_security()
        
        # Puedes loguear, imprimir o enviar estos datos a una API
        print(f"Lighting: {lighting_data}")
        print(f"Climate: {climate_data}")
        print(f"Security: {security_data}")

        time.sleep(SIMULATION_INTERVAL)

if __name__ == "__main__":
    run_simulation()
```

### 6. Ejecutar la Simulación

Una vez que tengas todos los archivos configurados, corre el contenedor Docker:

```bash
docker-compose up --build
```

Esto arrancará la simulación y producirá datos de dispositivos inteligentes en intervalos definidos en `.env`.

### Opcional: Guardar y Analizar los Datos

Para guardar los datos simulados y analizarlos, puedes:
- Redirigir la salida a un archivo log.
- Configurar una API simple con Flask o FastAPI y enviar los datos para su almacenamiento o visualización. 

Este esquema básico debería ayudarte a simular un entorno de hogar inteligente en Python con Docker y archivos `.env` configurables.

