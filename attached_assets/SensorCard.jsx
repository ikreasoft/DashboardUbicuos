import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorCard = ({ sensorName, sensorData, imageUrl, onImageChange }) => {
  const [imageInput, setImageInput] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const chartRef = useRef(null);
  
  // Filter valid data and ensure they are the most recent 20 entries
  const validData = React.useMemo(() => {
    return (sensorData || [])
      .filter(entry => (
        entry && 
        typeof entry.y !== 'undefined' && 
        entry.x && 
        !isNaN(new Date(entry.x).getTime())
      ))
      .slice(-20);
  }, [sensorData]);
  
  // Get the most recent entry
  const lastEntry = validData.length > 0 ? validData[validData.length - 1] : {
    y: 0,
    battery: 0, 
    linkquality: 0,
    x: new Date()
  };
  
  // Get the 5 most recent events for the table
  const lastEvents = validData.slice(-5).reverse();
  
  // Chart configuration
  const chartData = {
    labels: validData.map(entry => {
      const date = new Date(entry.x);
      return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    }),
    datasets: [{
      label: `Estado`,
      data: validData.map(entry => entry.y),
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.8)',
      stepped: false, // Cambiar de 'before' a false
      tension: 0.4,    // Añadir tensión para curvas suaves
      pointRadius: 2,
    }]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw === 1 ? 'Abierto' : 'Cerrado';
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5,
          font: { size: 9 }
        }
      },
      y: {
        display: true,
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return value === 1 ? 'Abierto' : 'Cerrado';
          },
          font: { size: 9 }
        }
      }
    }
  };
  
  const handleImageUpdate = () => {
    if (imageInput.trim()) {
      onImageChange(imageInput.trim());
      setImageInput("");
      setShowImageInput(false);
    }
  };
  
  // If no data but we have the sensor name, show an empty card
  if (validData.length === 0) {
    return (
      <div className="border rounded-lg shadow-md bg-white p-3 flex flex-col h-full sensor-card">
        <div className="flex items-center mb-2">
          <img
            src={imageUrl || "/sensor-icon.png"}
            alt={`Sensor ${sensorName}`}
            className="w-12 h-12 rounded-lg object-contain border p-1"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/sensor-icon.png";
            }}
          />
          <div className="ml-2">
            <h3 className="text-base font-semibold">{sensorName}</h3>
            <p className="text-xs text-gray-500">Esperando datos...</p>
          </div>
        </div>
        
        <div className="h-24 flex items-center justify-center bg-gray-50 rounded text-xs">
          <p className="text-gray-400">No hay datos disponibles</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg shadow-md bg-white p-3 flex flex-col h-full sensor-card">
      <div className="flex items-start mb-2">
        <div className="relative mr-2 group">
          <img
            src={imageUrl}
            alt={`Sensor ${sensorName}`}
            className="w-12 h-12 rounded-lg object-contain border p-1"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/sensor-icon.png";
            }}
          />
          <button
            className="absolute -top-1 -right-1 bg-gray-100 hover:bg-gray-200 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowImageInput(!showImageInput)}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold truncate">{sensorName}</h3>
          <div className="grid grid-cols-2 gap-x-2 text-xs">
            <div className="flex items-center">                
                <div className={`h-2 w-2 rounded-full mr-1 ${lastEntry.y === 1 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{lastEntry.y === 0 ? 'Abierto' : 'Cerrado'}</span>
            </div>
            <div>🔋 {lastEntry.battery || 0}%</div>
            <div>📶 {lastEntry.linkquality || 0} LQI</div>
            <div className="text-xs text-gray-500">
              {lastEntry.x ? (new Date(lastEntry.x)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) : ''}
            </div>
          </div>
        </div>
      </div>
      
      {showImageInput && (
        <div className="mb-2 flex">
          <input
            type="text"
            className="flex-1 border rounded-l-md px-2 py-0.5 text-xs"
            placeholder="URL de imagen"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleImageUpdate()}
          />
          <button
            className="bg-blue-500 text-white rounded-r-md px-2 py-0.5 text-xs"
            onClick={handleImageUpdate}
            type="button"
          >
            OK
          </button>
        </div>
      )}
      
      <div className="chart-container my-1 mx-auto w-full">
        {validData.length > 0 && (
          <Line
            ref={chartRef}
            data={chartData}
            options={chartOptions}
            key={`chart-${sensorName}-${Date.now()}`}
          />
        )}
      </div>
      
      <div className="mt-auto">
        <button
          className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
          onClick={() => setShowEvents(!showEvents)}
          type="button"
        >
          {showEvents ? 'Ocultar eventos' : 'Ver últimos 5 eventos'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-3 w-3 ml-1 transition-transform ${showEvents ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showEvents && (
          <div className="mt-1 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-1 border text-left font-medium text-gray-600">Tiempo</th>
                  <th className="p-1 border text-center font-medium text-gray-600">Estado</th>
                  <th className="p-1 border text-center font-medium text-gray-600">Batería</th>
                  <th className="p-1 border text-center font-medium text-gray-600">Señal</th>
                </tr>
              </thead>
              <tbody>
                {lastEvents.map((event, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-1 border">
                      {event.x ? (new Date(event.x)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) : 'N/A'}
                    </td>
                    <td className="p-1 border text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${event.y === 1 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </td>
                    <td className="p-1 border text-center">{event.battery || 0}%</td>
                    <td className="p-1 border text-center">{event.linkquality || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorCard;