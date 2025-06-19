const DayCard = ({ day }) => {
  return (
    <div className="bg-gray-200 border border-yellow-500 p-2 text-center">
      <div className="font-semibold">{day.label}</div>
      <div className="text-sm">{day.date}</div>
      {day.iconUrl && <img src={day.iconUrl} alt="" className="h-12 mx-auto" />}
      <div className="mt-2">{day.maxTemp}° | {day.minTemp}°</div>
      <div className="text-sm">{day.description}</div>
    </div>
  );
};

export default DayCard;
