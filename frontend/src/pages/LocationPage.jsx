import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import DayCard from '../components/DayCard';

const LocationPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/forecast/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) return <div className="text-center p-4">Loading...</div>;

  const days = data.days.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('en-GB', { weekday: 'short' })
  }));

  return (
    <div className="text-white min-h-screen">
      <header className="bg-black p-4 flex justify-between items-center h-48">
        <h1 className="text-3xl">{data.name}</h1>
        <div className="text-right">
          <div className="text-4xl">{data.current.temperature}°C</div>
          <div>{data.current.description || `Code ${data.current.weathercode}`}</div>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-2 p-4">
        {days.map((day, idx) => (
          <DayCard key={idx} day={day} />
        ))}
      </div>
    </div>
  );
};

export default LocationPage;
