import React from 'react';
import './WeatherCard.css';

const ICON_URL = 'https://openweathermap.org/img/wn/';

export default function WeatherCard({ data, onSave, isSaved }) {
  if (!data) return null;

  const icon = data.weather[0]?.icon;
  const description = data.weather[0]?.description;

  return (
    <div className="weather-card">
      <div className="card-header">
        <h3>{data.name}</h3>
        {onSave && (
          <button
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => onSave(data)}
            aria-label={isSaved ? 'Remove from saved' : 'Save location'}
          >
            {isSaved ? '★' : '☆'}
          </button>
        )}
      </div>

      <div className="card-body">
        {icon && (
          <img
            src={`${ICON_URL}${icon}@2x.png`}
            alt={description}
            className="weather-icon"
          />
        )}
        <div className="temp">{Math.round(data.main.temp)}°C</div>
        <div className="desc">{description}</div>
      </div>

      <div className="card-footer">
        <span>💧 {data.main.humidity}%</span>
        <span>💨 {Math.round(data.wind.speed)} m/s</span>
        <span>🌡 Feels {Math.round(data.main.feels_like)}°C</span>
      </div>
    </div>
  );
}
