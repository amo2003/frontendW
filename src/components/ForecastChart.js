import React from 'react';
import './ForecastChart.css';

const ICON_URL = 'https://openweathermap.org/img/wn/';

// Group 3-hour intervals by day
function groupByDay(list) {
  return list.reduce((acc, item) => {
    const day = new Date(item.dt * 1000).toLocaleDateString('en-LK', {
      weekday: 'short', month: 'short', day: 'numeric',
    });
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});
}

export default function ForecastChart({ data }) {
  if (!data?.list) return null;

  const grouped = groupByDay(data.list);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast — {data.city?.name}</h3>
      <div className="forecast-grid">
        {Object.entries(grouped).slice(0, 5).map(([day, items]) => {
          const midday = items[Math.floor(items.length / 2)];
          const minTemp = Math.round(Math.min(...items.map(i => i.main.temp_min)));
          const maxTemp = Math.round(Math.max(...items.map(i => i.main.temp_max)));
          const icon = midday.weather[0]?.icon;

          return (
            <div key={day} className="forecast-day">
              <div className="forecast-date">{day}</div>
              {icon && (
                <img
                  src={`${ICON_URL}${icon}@2x.png`}
                  alt={midday.weather[0]?.description}
                  className="forecast-icon"
                />
              )}
              <div className="forecast-temps">
                <span className="max">{maxTemp}°</span>
                <span className="separator">/</span>
                <span className="min">{minTemp}°</span>
              </div>
              <div className="forecast-desc">{midday.weather[0]?.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
