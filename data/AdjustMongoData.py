import os
import pandas as pd
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import random

# Cargar variables de entorno desde .env
load_dotenv()

# Variables de configuración
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
CSV_FILE = os.getenv("CSV_FILE")

# Conexión a MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def generate_random_objectid():
    """
    Genera un ObjectId aleatorio.
    Returns:
        ObjectId: Un nuevo ObjectId generado aleatoriamente.
    """
    random_id = bytes(random.getrandbits(8) for _ in range(12))
    return ObjectId(random_id)

def map_event_to_schema(row):
    """
    Transforma una fila del CSV en un documento que cumple con el esquema de MongoDB.

    Args:
        row (pd.Series): Fila del DataFrame CSV.

    Returns:
        dict: Documento transformado para MongoDB.
    """
    return {
        "device": generate_random_objectid(),  # ObjectId aleatorio
        "session": generate_random_objectid(),  # ObjectId aleatorio para la sesión
        "location": row['name'],  # Ubicación del evento
        "value": row['eventCode'],  # Código del evento
        "measureUnit": "event",  # Unidad de medida fija
        "timestamp": pd.to_datetime(row['dateAndTime']),  # Conversión de fecha y hora
    }

def process_csv(file_path):
    """
    Lee un archivo CSV, transforma sus filas y las inserta en MongoDB.

    Args:
        file_path (str): Ruta al archivo CSV.
    """
    print(f"Procesando el archivo CSV: {file_path}")

    # Leer archivo CSV
    df = pd.read_csv(file_path)
    print(f"Se cargaron {len(df)} filas del archivo CSV.")

    # Transformar datos
    records = df.apply(map_event_to_schema, axis=1).tolist()

    # Insertar datos en MongoDB
    try:
        result = collection.insert_many(records)
        print(f"Se insertaron {len(result.inserted_ids)} documentos en MongoDB.")
    except Exception as e:
        print(f"Error al insertar los datos en MongoDB: {e}")

if __name__ == "__main__":
    """
    Punto de entrada principal para procesar el archivo CSV e insertar los datos en MongoDB.
    """
    process_csv(CSV_FILE)
