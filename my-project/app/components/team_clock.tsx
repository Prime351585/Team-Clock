import Clock from "./Clock";

export function TeamClock()
{
return(

    <div className="flex relative border border-zinc-400 w-[400px] h-[200px] p-0 rounded-lg">
        <div className="bg-white w-[50%]  rounded-lg">
            <div className="text-black text-xl ml-3 mt-2">
                Team
            </div>
            <div className="bg-transparent-200">
                <Clock/>
            </div>
        </div>
        <div className="bg-gray-100 w-[50%]  rounded-tr-lg rounded-br-lg">
            <div className="text-xl mt-2 ml-3">
            List
            </div>
        </div>
    </div>
)
}