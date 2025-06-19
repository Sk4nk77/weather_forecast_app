# Weather Forecast App

This project provides a simple weather forecast web application with a Node.js backend and a React frontend styled with Tailwind CSS.

## Prerequisites
- Node.js 18+

## Installation

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd ../frontend
npm install
```

If `npm start` later reports `react-scripts: not found`, ensure the dependencies
installed correctly by running:
```bash
npm install react-scripts
# or use
npx react-scripts start
```

## Running the Application

### Start Backend
```bash
npm start
```
The server listens on port `5000` and exposes REST endpoints under `/api`.

### Start Frontend
In another terminal:
```bash
npm start
```
This runs the React development server which proxies API requests to the backend.

## Configuration
No additional configuration is required. Locations and their tweak settings are stored in `backend/data/locations.json`.

## Project Structure
- **backend** – Express server, cron job and API routes
- **frontend** – React application

Use the Settings page (`/settings`) in the frontend to manage locations and tweak daily forecasts. Visit `/location/:id` to view the forecast for a specific location.
