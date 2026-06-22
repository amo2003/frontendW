import axios from 'axios';

// Point this at your WSO2 API Manager Gateway URL in production
// In dev, it hits the Express backend directly
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

function getAuthHeaders(accessToken) {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function getOverview(accessToken) {
  const { data } = await axios.get(`${BASE_URL}/weather/overview`, {
    headers: getAuthHeaders(accessToken),
  });
  return data;
}

export async function getCurrentWeather(city, accessToken) {
  const { data } = await axios.get(`${BASE_URL}/weather/current`, {
    params: { city },
    headers: getAuthHeaders(accessToken),
  });
  return data;
}

export async function getForecast(city, accessToken) {
  const { data } = await axios.get(`${BASE_URL}/weather/forecast`, {
    params: { city },
    headers: getAuthHeaders(accessToken),
  });
  return data;
}

export async function getSavedLocations(accessToken) {
  const { data } = await axios.get(`${BASE_URL}/locations`, {
    headers: getAuthHeaders(accessToken),
  });
  return data;
}

export async function saveLocation(location, accessToken) {
  const { data } = await axios.post(`${BASE_URL}/locations`, location, {
    headers: getAuthHeaders(accessToken),
  });
  return data;
}

export async function deleteLocation(id, accessToken) {
  await axios.delete(`${BASE_URL}/locations/${id}`, {
    headers: getAuthHeaders(accessToken),
  });
}
