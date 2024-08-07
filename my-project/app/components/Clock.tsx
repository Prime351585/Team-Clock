"use client"
import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return null; // or a loading spinner
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5; // 360 / 12 = 30 degrees per hour
  const minuteDegrees = minutes * 6; // 360 / 60 = 6 degrees per minute
  const secondDegrees = seconds * 6; // 360 / 60 = 6 degrees per second

  return (
    <div className="flex items-center justify-center">
      <div className="relative text xl p-4 rounded-full h-40 w-40 bg-transparent flex justify-center items-center text-center">
        <div className="absolute w-[3px] h-10 top-[25%] rounded-2xl bg-black origin-bottom" style={{ transform: `rotate(${hourDegrees}deg)` }} />
        <div className="absolute w-[2px] h-12 top-[20%] rounded-2xl bg-gray-900 origin-bottom" style={{ transform: `rotate(${minuteDegrees}deg)` }} />
        <div className="absolute w-[1px] h-14 top-[15%] rounded-2xl bg-gray-500 origin-bottom" style={{ transform: `rotate(${secondDegrees}deg)` }} />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="absolute text-gray-300" style={{ transform: `rotate(${i * 30}deg) translate(0, -220%)` }}>
            {"|"}
          </div>
        ))}
        <div className="relative text-sm top-[20%] text-gray-700">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}