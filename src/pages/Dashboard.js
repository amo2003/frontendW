import React, { useEffect, useState, useCallback } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import WeatherCard from '../components/WeatherCard';
import ForecastChart from '../components/ForecastChart';
import SearchBar from '../components/SearchBar';
import {
  getOverview,
  getCurrentWeather,
  getForecast,
  getSavedLocations,
  saveLocation,
  deleteLocation,
} from '../api/weatherApi';
import './Dashboard.css';

export default function Dashboard() {
  const { getAccessToken } = useAuthContext();
  const [overview, setOverview] = useState([]);
  const [selected, setSelected] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const token = await getAccessToken();
      const [cities, saved] = await Promise.all([
        getOverview(token),
        getSavedLocations(token),
      ]);
      setOverview(cities);
      setSavedLocations(saved);
      if (cities.length > 0) {
        try {
          const [current, fc] = await Promise.all([
            getCurrentWeather(cities[0].name, token),
            getForecast(cities[0].name, token),
          ]);
          setSelected(current);
          setForecast(fc);
        } catch {
          setError('City not found or service unavailable.');
        }
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err?.response?.status, err?.response?.data || err?.message);
      setError(`Failed to load weather data. (${err?.response?.status || err?.message})`);
    } finally {
      setLoading(false);
    }
  }, [getAccessToken]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function selectCity(cityQuery, existingToken) {
    try {
      const token = existingToken || await getAccessToken();
      const [current, fc] = await Promise.all([
        getCurrentWeather(cityQuery, token),
        getForecast(cityQuery, token),
      ]);
      setSelected(current);
      setForecast(fc);
    } catch {
      setError('City not found or service unavailable.');
    }
  }

  async function handleSave(cityData) {
    try {
      const token = await getAccessToken();
      const already = savedLocations.find(l => l.city === cityData.name);
      if (already) {
        await deleteLocation(already._id, token);
        setSavedLocations(prev => prev.filter(l => l._id !== already._id));
      } else {
        const saved = await saveLocation({
          city: cityData.name,
          country: 'LK',
          lat: cityData.coord?.lat,
          lon: cityData.coord?.lon,
        }, token);
        setSavedLocations(prev => [...prev, saved]);
      }
    } catch {
      setError('Could not save location.');
    }
  }

  function isSaved(cityName) {
    return savedLocations.some(l => l.city === cityName);
  }

  if (loading) return <div className="loading">Loading Sri Lanka weather...</div>;

  return (
    <main className="dashboard">
      <section className="search-section">
        <SearchBar onSearch={city => selectCity(city)} />
      </section>

      {error && <div className="error-banner" role="alert">{error}</div>}

      {selected && (
        <section className="selected-section">
          <WeatherCard
            data={selected}
            onSave={handleSave}
            isSaved={isSaved(selected.name)}
          />
          <ForecastChart data={forecast} />
        </section>
      )}

      {savedLocations.length > 0 && (
        <section className="saved-section">
          <h2>Saved Locations</h2>
          <div className="cards-grid">
            {savedLocations.map(loc => (
              <div
                key={loc._id}
                className="saved-city-chip"
                onClick={() => selectCity(`${loc.city},LK`)}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && selectCity(`${loc.city},LK`)}
                role="button"
                aria-label={`View weather for ${loc.city}`}
              >
                {loc.city}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="overview-section">
        <h2>Sri Lanka Overview</h2>
        <div className="cards-grid">
          {overview.map(city => (
            <div
              key={city.id}
              onClick={() => selectCity(city.name)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && selectCity(city.name)}
              aria-label={`View details for ${city.name}`}
              style={{ cursor: 'pointer' }}
            >
              <WeatherCard
                data={city}
                onSave={handleSave}
                isSaved={isSaved(city.name)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
