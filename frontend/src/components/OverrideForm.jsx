import { useState } from 'react';

const OverrideForm = ({ location, onSubmit, onCancel }) => {
  const [tweaks, setTweaks] = useState(location.tweaks || Array(6).fill({}));

  const handleChange = (idx, field, value) => {
    const newTw = [...tweaks];
    newTw[idx] = { ...newTw[idx], [field]: value };
    setTweaks(newTw);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ tweaks });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 mb-4">
      {tweaks.map((tw, idx) => (
        <div key={idx} className="border p-2 mb-2">
          <div className="font-semibold">Day {idx + 1}</div>
          <input className="border w-full mb-1" placeholder="Icon URL" value={tw.iconUrl || ''} onChange={e => handleChange(idx, 'iconUrl', e.target.value)} />
          <input className="border w-full mb-1" placeholder="Description" value={tw.description || ''} onChange={e => handleChange(idx, 'description', e.target.value)} />
          <input className="border w-full mb-1" placeholder="Max Temp" value={tw.maxTemp || ''} onChange={e => handleChange(idx, 'maxTemp', e.target.value)} />
          <input className="border w-full" placeholder="Min Temp" value={tw.minTemp || ''} onChange={e => handleChange(idx, 'minTemp', e.target.value)} />
        </div>
      ))}
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">Save</button>
        <button type="button" className="bg-gray-300 px-3 py-1" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default OverrideForm;
