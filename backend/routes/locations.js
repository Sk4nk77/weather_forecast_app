const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/locations.json');

function loadLocations() {
  return JSON.parse(fs.readFileSync(dataPath));
}

function saveLocations(locs) {
  fs.writeFileSync(dataPath, JSON.stringify(locs, null, 2));
}

router.get('/', (req, res) => {
  res.json(loadLocations());
});

router.post('/', (req, res) => {
  const { name, latitude, longitude } = req.body;
  const locs = loadLocations();
  const newLoc = {
    id: Date.now().toString(),
    name,
    latitude,
    longitude,
    tweaks: []
  };
  locs.push(newLoc);
  saveLocations(locs);
  res.json(newLoc);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const locs = loadLocations();
  const loc = locs.find(l => l.id === id);
  if (!loc) return res.status(404).json({ error: 'not found' });
  Object.assign(loc, updates);
  saveLocations(locs);
  res.json(loc);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let locs = loadLocations();
  locs = locs.filter(l => l.id !== id);
  saveLocations(locs);
  res.json({ success: true });
});

module.exports = router;
