import random
import datetime
import requests
import json
import time
import argparse
from alive_progress import alive_bar

"""
    Envia un json a la API
    params: json: json a enviar

    return: status_code: 200 si se ha enviado correctamente
            text:        respuesta del servidor
    """
def postJson(json, token =None):
    print(json)
    url = "http://localhost:3000/sessions/dataSecure"
    headers = {'Content-type': 'application/json'}
    if token is not None:
        headers['Authorization'] = 'Bearer '+ token
    response = requests.post(url, data=json, headers=headers)
    return response.status_code, response.text

"""
    Simula los registros de un sensor entre dos fechas
    params: inicio:     fecha de inicio
            fin:        fecha de fin
            frecuencia: frecuencia de los registros
            extra_args: parametros adicionales que se añadiran a los registros en formato clave valor, es decir van en pareja Eje: location casa measueUnit temperatura
"""
def simularRegistros(inicio, fin, frecuencia, extra_args, minimo=0, maximo=1, token=None):
    fecha = inicio
    data = {}
    for i in range(0, len(extra_args), 2):
            data[extra_args[i]] = extra_args[i+1]
    with alive_bar(int((fin-inicio).total_seconds()/frecuencia), title='Procesando', bar='filling', spinner='wait') as bar:
        while fecha < fin:
            fecha = fecha + datetime.timedelta(seconds=frecuencia)
            valor = 0
            if minimo == 0 and maximo == 1:
                valor = random.randint(0, 1)
            else:
                valor = random.uniform(minimo, maximo)
            data["value"] = valor
            data["timestamp"] = fecha.strftime("%Y-%m-%d %H:%M:%S")
            status, text = postJson(json.dumps(data),token)
            if status == 200:
                bar()
            else:
                print(f'Error al enviar los datos {status}')
                print(text)
                break

"""
    Comprueba los argumentos pasados por consola y los devuelve
    return: inicio:           fecha de inicio
            fin:              fecha de fin
            frecuencia:       frecuencia de los registros
            minimo:           valor mínimo del sensor [Opcional]
            maximo:           valor máximo del sensor [Opcional]
            parametros_extra: parametros adicionales que se añadiran a los registros en formato clave valor, es decir van en pareja Eje: location casa measueUnit temperatura
    """
def comprobarArgumentos():
    parser = argparse.ArgumentParser(description='Simula los registros de un sensor entre dos fechas',epilog="Para añadir parametros que tengan espacioa hay que ponerlos entre commillas \"parametro con espacios\"",add_help=False)
    parser.add_argument('extra_args', type=str, nargs=argparse.REMAINDER, help='Parámetros adicionales que se mandan a la API en formato clave valor. Eje: location casa measueUnit temperatura')
    parser.add_argument('--fin', type=str, help='Fecha hasta que se simulan los registros\nformato --fin "YYYY-MM-DD HH:MM:SS"')
    parser.add_argument('--frec', type=int, help='Frecuencia de los registros en segundos 1 día = 86400 segundos')
    parser.add_argument('--help','-h', help='Muestra este mensaje de ayuda', action='store_true')
    parser.add_argument('--inicio', type=str, help='Fecha desde que se empiezan a simular los registros\nformato --inicio "YYYY-MM-DD HH:MM:SS"')
    parser.add_argument('--token', type=str, help='Token de autenticación')
    parser.add_argument('--max', type=float, help='Valor máximo del sensor')
    parser.add_argument('--min', type=float, help='Valor mínimo del sensor')
    args = parser.parse_args()
    if args.help:
        parser.print_help()
        exit()
    if args.inicio is None or args.fin is None or args.frec is None:
        print('Faltan argumentos.\nLos parametros inicio, fin y frec son obligatorios')
        exit()
    inicio = datetime.datetime.strptime(args.inicio, "%Y-%m-%d %H:%M:%S")
    fin = datetime.datetime.strptime(args.fin, "%Y-%m-%d %H:%M:%S")
    frecuencia = args.frec
    token = args.token
    min = 0 if args.min == None else args.min
    max = 1 if args.max == None else args.max
    if inicio > fin:
        print('La fecha de inicio debe ser menor a la fecha de fin')
        exit()
    if max is not None and min is not None and max < min:
        print(f'El valor máximo debe ser mayor al valor mínimo {min} < {max}')
        exit()
    print(f'inicio: {inicio}')
    print(f'End: {fin}')
    print(f'Freq: {frecuencia}')
    parametros_extra = args.extra_args
    print(f'Extra args: {parametros_extra}')
    return inicio, fin, frecuencia, min, max, token, parametros_extra

def main():
   inicio, fin, frecuencia, minimo, maximo,token, extra_args = comprobarArgumentos()
   simularRegistros(inicio, fin, frecuencia, extra_args, minimo, maximo, token)

    
if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print('Saliendo...')
        exit()