import React, { useState, useEffect } from "react";
import { Activity, Wifi, WifiOff, AlertCircle } from "lucide-react";

const ConnectionStatus = ({ 
  isConnected, 
  connectionError,
  isUsingLoadedData, 
  broker = "localhost:9001",
  retryConnection
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [timeDisconnected, setTimeDisconnected] = useState(null);

  useEffect(() => {
    if (!isConnected && !isUsingLoadedData) {
      setTimeDisconnected(new Date());
    } else {
      setTimeDisconnected(null);
    }
  }, [isConnected, isUsingLoadedData]);

  // Si estamos usando datos cargados, no mostramos el estado de conexión
  if (isUsingLoadedData) {
    return (
      <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs">
        <Activity className="h-3.5 w-3.5 mr-1.5" />
        <span>Usando datos cargados</span>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center cursor-pointer ${
        isConnected 
          ? "bg-green-50 text-green-700" 
          : "bg-red-50 text-red-700"
      } px-3 py-1 rounded-md text-xs transition-colors`}
      onClick={() => setShowDetails(!showDetails)}
      role="button"
      tabIndex={0}
      aria-label="Estado de conexión"
    >
      {isConnected ? (
        <>
          <Wifi className="h-3.5 w-3.5 mr-1.5" />
          <span>Conectado a MQTT</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3.5 w-3.5 mr-1.5" />
          <span>Desconectado</span>
        </>
      )}

      {showDetails && (
        <div className="absolute z-10 mt-24 -ml-4 w-64 bg-white border rounded-md shadow-lg p-3 text-gray-800">
          <h3 className="font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Detalles de conexión
          </h3>
          <dl className="grid grid-cols-2 gap-x-1 gap-y-2 text-xs">
            <dt className="text-gray-500">Estado:</dt>
            <dd className={isConnected ? "text-green-600" : "text-red-600"}>
              {isConnected ? "Conectado" : "Desconectado"}
            </dd>
            
            <dt className="text-gray-500">Broker:</dt>
            <dd>{broker}</dd>
            
            {!isConnected && timeDisconnected && (
              <>
                <dt className="text-gray-500">Tiempo sin conexión:</dt>
                <dd>
                  {Math.floor((new Date() - timeDisconnected) / 60000)} minutos
                </dd>
              </>
            )}
            
            {connectionError && (
              <>
                <dt className="text-gray-500">Error:</dt>
                <dd className="text-red-600 col-span-2">{connectionError}</dd>
              </>
            )}
          </dl>
          <div className="mt-3 flex justify-end">
            {!isConnected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (retryConnection) retryConnection();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
              >
                Reconectar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;