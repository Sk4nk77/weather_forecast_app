const express = require('express');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/locations.json');

function loadLocations() {
  return JSON.parse(fs.readFileSync(dataPath));
}

module.exports = (getForecastData, fetchAll) => {
  const router = express.Router();

  router.post('/fetch-forecast', async (req, res) => {
    await fetchAll();
    res.json({ success: true });
  });

  router.get('/forecast/:id', (req, res) => {
    const id = req.params.id;
    const forecastData = getForecastData();
    const forecast = forecastData[id];
    if (!forecast) return res.status(404).json({ error: 'no forecast' });
    const locations = loadLocations();
    const loc = locations.find(l => l.id === id);
    if (!loc) return res.status(404).json({ error: 'location not found' });

    const tweaks = loc.tweaks || [];
    const days = [];
    for (let i = 0; i < 6; i++) {
      const base = {
        date: forecast.daily.time[i + 1],
        weathercode: forecast.daily.weather_code[i + 1],
        maxTemp: forecast.daily.temperature_2m_max[i + 1],
        minTemp: forecast.daily.temperature_2m_min[i + 1],
        iconUrl: null,
        description: null
      };
      const tw = tweaks[i] || {};
      if (tw.iconUrl) base.iconUrl = tw.iconUrl;
      if (tw.description) base.description = tw.description;
      if (tw.maxTemp) base.maxTemp = tw.maxTemp;
      if (tw.minTemp) base.minTemp = tw.minTemp;
      days.push(base);
    }

    const result = {
      id: loc.id,
      name: loc.name,
      current: {
        temperature: forecast.current_weather.temperature,
        weathercode: forecast.current_weather.weathercode
      },
      days
    };
    res.json(result);
  });

  return router;
};
