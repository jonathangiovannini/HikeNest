import Stat from '../components/Stat';
import type { StatsValue } from '../types';

const statsValue: StatsValue[] = [
    {
        label: "Totale KM:",
        value: "450 km",
        icon: <i className="fa-solid fa-route"></i>
    },
    {
        label: "Escursioni:",
        value: "28",
        icon: <i className="fa-solid fa-mountain"></i>    
    },
    {
        label: "Tempo Totale:",
        value: "112 h",
        icon: <i className="fa-regular fa-clock"></i>

    },

];


const StatGrid = () => {
    return (
        <>
        <div className = 'flex flex-col'>
            <h1>Le Mie Escursioni</h1>
            <div className = 'grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4'>
                {statsValue.map((member, index) => (
                        <Stat key={index} {...member}/>
                    ))}
            </div>
        </div>
            
        </>
    );
}

export default StatGrid;