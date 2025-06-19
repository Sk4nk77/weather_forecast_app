import { useState } from 'react';

const LocationForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 mb-4">
      <div>
        <label className="block">Name</label>
        <input className="border w-full" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block">Latitude</label>
        <input className="border w-full" value={latitude} onChange={e => setLatitude(e.target.value)} required />
      </div>
      <div>
        <label className="block">Longitude</label>
        <input className="border w-full" value={longitude} onChange={e => setLongitude(e.target.value)} required />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">Save</button>
        <button type="button" className="bg-gray-300 px-3 py-1" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default LocationForm;
