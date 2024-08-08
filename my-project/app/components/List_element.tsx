import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface ListElementProp {
  name:string
  city: string;
  country: string;
  time: string;
  timeDifference: string;
  pfp: string;
  setAngle: Function;
}


export function List_element(props: ListElementProp) {
  const timeRollRef = useRef<HTMLDivElement>(null);
  const timeRoll1Ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeRollRef.current && timeRoll1Ref.current) {
      gsap.to(timeRollRef.current, { y: -10, duration: 0.1, opacity: 0 });
      gsap.to(timeRoll1Ref.current, { y: -10, duration: 0.1, opacity: 1 });
      props.setAngle(parseInt(props.timeDifference.split("Hours")[0])*30);
    }
  };

  const handleLeave = () => {
    if (timeRollRef.current && timeRoll1Ref.current) {
      gsap.to(timeRollRef.current, { y: 10, duration: 0.1, opacity: 1 });
      gsap.to(timeRoll1Ref.current, { y: 10, duration: 0.1, opacity: 0 });
      props.setAngle(0);
    }
  };
    return(
        <div className="flex flex-row pt-1 pb-[3px] relative left-[5%] w-[95%] border border-transparent rounded-lg hover:bg-gray-100 " onMouseEnter={handleEnter} onMouseLeave={handleLeave}>

            <div className="flex justify-center items-center">
                <img src={props.pfp} alt="pfp" className="h-6 w-6 rounded-full"/>
            </div>

            <div className="flex flex-col pl-1">
                <div className="flex flex-row">

            <div className="text-[15px] font-bold">{props.name}</div>
            <div className="text-[10px] mt-[3px] absolute right-[5%]">
                <div ref={timeRollRef}>        
                {props.time}
                </div>
                <div ref={timeRoll1Ref} className={`opacity-0 text-[7px] ${parseInt(props.timeDifference.split("Hours")[0])<0? 'text-red-500' : 'text-green-500'}`}>        
                {parseInt(props.timeDifference.split("Hours")[0])==0?<div className='text-gray-800'>No Change</div>:props.timeDifference}
                </div>
                </div>
                </div>
            <div className="text-[9px] mt-[-5px] text-gray-700">{props.city+","+props.country}</div>
            </div>

        </div>
    )
}