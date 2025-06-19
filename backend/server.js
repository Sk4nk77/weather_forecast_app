const express = require('express');
const fs = require('fs');
const path = require('path');

const locationsRouter = require('./routes/locations');
const createForecastRouter = require('./routes/forecast');
const fetchForecast = require('./services/fetchForecast');
const setupCron = require('./cron');

const app = express();
app.use(express.json());

app.use('/api/locations', locationsRouter);

let forecastData = {};

async function fetchAllForecasts() {
  const locationsPath = path.join(__dirname, 'data', 'locations.json');
  const locations = JSON.parse(fs.readFileSync(locationsPath));
  forecastData = await fetchForecast(locations);
}

app.use('/api', createForecastRouter(() => forecastData, fetchAllForecasts));

fetchAllForecasts();
setupCron(fetchAllForecasts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
