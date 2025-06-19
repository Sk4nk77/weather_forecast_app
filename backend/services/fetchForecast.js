const axios = require('axios');

async function fetchForecast(locations) {
  const results = {};
  for (const loc of locations) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current_weather=true&timezone=Europe%2FLondon`;
    const res = await axios.get(url);
    results[loc.id] = res.data;
  }
  return results;
}

module.exports = fetchForecast;
