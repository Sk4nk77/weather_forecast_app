import { Routes, Route } from 'react-router-dom';
import LocationPage from './pages/LocationPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/location/:id" element={<LocationPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default App;
