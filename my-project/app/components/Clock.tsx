"use client"
import gsap from 'gsap';
interface ClockProps {
  angle: number;
  pressed: boolean;
}
import { useState, useEffect,useRef } from 'react';

export default function Clock(props : ClockProps) {
  const [time, setTime] = useState<Date | null>(null);
  const hourHandRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    const isClockwise = props.angle>0;
    if (gradientRef.current) {
        gradientRef.current.style.background = isClockwise
            ? `conic-gradient(from ${hourDegrees}deg, rgba(0,200,0,0.5), rgba(0,200,0,0) ${props.angle}deg)`
            : `conic-gradient(from ${hourDegrees+props.angle}deg, rgba(200,0,0,0.3), rgba(200,0,0,0.0) ${-props.angle}deg)`
    }
},[props.angle])

  if (!time) {
    return null; // or a loading spinner
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5; // 360 / 12 = 30 degrees per hour
  const minuteDegrees = minutes * 6; // 360 / 60 = 6 degrees per minute
  const secondDegrees = seconds * 6; // 360 / 60 = 6 degrees per second
  gsap.to(hourHandRef.current,{rotate:180+hourDegrees+props.angle})
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative text xl p-4 rounded-full h-40 w-40 bg-transparent flex justify-center items-center text-center" ref={gradientRef}>

        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="absolute " style={{ transform: `rotate(${i * 30}deg) translate(0, -410%)` }}>
            <hr className="w-[2px] h-[14px] bg-gray-600 rounded-lg" />
          </div>
        ))}
        
        <div ref={hourHandRef} className=" absolute w-[3px] h-[60px] top-[42.5%] rounded-2xl bg-black origin-bottom" style={{ transformOrigin:"50% 20%" , transform: `rotate(${180+hourDegrees}deg)` }} />
        <div className="absolute w-[3px] h-[70px] top-[41%] rounded-2xl bg-gray-600 origin-bottom" style={{transformOrigin:"50% 20%" , transform: `rotate(${180+minuteDegrees}deg)` }} />
        <div className="absolute w-[1px] h-[70px] top-[41%] rounded-2xl bg-red-500 origin-bottom" style={{ transformOrigin:"50% 20%",transform: `rotate(${180+secondDegrees}deg)`}} />
        <div className="absolute w-[5px] h-[5px] rounded-2xl bg-red-500 origin-bottom" style={{ transformOrigin:"0px 50%" }} />
        
        <div className="relative text-sm top-[20%] text-gray-700">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}