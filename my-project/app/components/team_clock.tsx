"use client"
const user = [
    {name: "Prime", city:"Vancouver",country:"USA",time:"10:40 PM",timeDifference:"+3 Hours",pfp:"https://avatars.githubusercontent.com/u/76157279?v=4"},
    {name: "Kumail",  city:"Vancouver",country:"USA",time:"10:41 PM",timeDifference:"-3 Hours",pfp:"https://avatars.githubusercontent.com/u/76157279?v=4"},
    {name: "Jack",  city:"Vancouver",country:"USA",time:"10:42 PM",timeDifference:"+5 Hours",pfp:"https://avatars.githubusercontent.com/u/76157279?v=4"},
    {name: "Jill",  city:"Vancouver",country:"USA",time:"10:43 PM",timeDifference:"-0 Hours",pfp:"https://avatars.githubusercontent.com/u/76157279?v=4"},
    {name: "James", city:"Vancouver",country:"USA",time:"10:44 PM",timeDifference:"+1 Hours",pfp:"https://avatars.githubusercontent.com/u/76157279?v=4"},
    // {name: "John",  city:"Vancouver",country:"USA",time:"10:40 PM",timeDifference:"+2 Hours",pfp:"https://avatars.githubusercontent.com/u/76157279?v=4"},
]



import Clock from "./Clock";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { List_element } from "./List_element";
import ToggleButton from "./toggleButton";
export function TeamClock()
{
    const [width, setWidth] = useState(true);
    const [angle,setAngle] = useState(0);
    const [pressed, isPressed] = useState(false);
    function handleResize() {
        setWidth(!width)
        isPressed(!pressed)
        gsap.to(".clockmove",{x:width?"50%":0})
        gsap.to(".listmove",{clipPath: !width ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)'})
    }


return(

    <div className="flex relative border border-zinc-300 w-[350px] h-[200px] p-0 rounded-lg hover:shadow-lg">
        <div className="bg-white w-[50%]  rounded-lg">
            
            <div className="flex text-black text-xl ml-3 mt-2">
                Team
            {/* <button className="text-sm ml-10 border border-green-400 " onClick={handleResize}>Add</button> */}
            <div className="ml-10">
            <ToggleButton onClick={handleResize}/>
            </div>

            </div>
            <div className="clockmove bg-transparent-200">
                <Clock angle={angle} pressed={pressed}/>
            </div>
        </div>
 
        <div className="listmove bg-gray-50 w-[50%]  rounded-tr-lg rounded-br-lg">
            <div>
            {user.map((user,index) => (
                <List_element key={index} name={user.name} city={user.city} country={user.country} time={user.time} pfp={user.pfp} timeDifference={user.timeDifference} setAngle={setAngle} />
            ))}
            </div>
        </div>
        
    </div>
)
}