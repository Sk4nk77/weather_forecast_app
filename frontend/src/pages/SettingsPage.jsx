import { useEffect, useState } from 'react';
import api from '../api';
import LocationForm from '../components/LocationForm';
import OverrideForm from '../components/OverrideForm';

const SettingsPage = () => {
  const [locations, setLocations] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    api.get('/locations').then(res => setLocations(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (data) => {
    await api.post('/locations', data);
    setAdding(false);
    load();
  };

  const handleEdit = async (data) => {
    await api.put(`/locations/${editing.id}`, data);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/locations/${id}`);
    load();
  };

  const fetchForecast = () => {
    api.post('/fetch-forecast');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Settings</h1>
        <button className="bg-green-500 text-white px-2 py-1" onClick={fetchForecast}>Fetch Data</button>
      </div>
      {adding && <LocationForm onSubmit={handleAdd} onCancel={() => setAdding(false)} />}
      {editing && <OverrideForm location={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />}
      <button className="bg-blue-500 text-white px-2 py-1 mb-4" onClick={() => setAdding(true)}>Add Location</button>
      <ul className="space-y-2">
        {locations.map(loc => (
          <li key={loc.id} className="border p-2 flex justify-between items-center">
            <span>{loc.name}</span>
            <div className="space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1" onClick={() => setEditing(loc)}>Edit</button>
              <button className="bg-red-500 text-white px-2 py-1" onClick={() => handleDelete(loc.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
