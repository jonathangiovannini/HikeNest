import Stat from '../components/Stat';
import type { StatsValue } from '../types';

const statsValue: StatsValue[] = [
    {
        label: "Totale KM:",
        value: localStorage.getItem("kmTotali"),
        icon: <i className="fa-solid fa-route"></i>
    },
    {
        label: "Escursioni:",
        value: localStorage.getItem("nGruppi"),
        icon: <i className="fa-solid fa-mountain"></i>    
    }
];


const StatGrid = () => {
    return (
        <>
        <div className = 'flex flex-col items-center'>
            <h2 className="text-2xl font-bold text-mine-shaft-950 mb-6 text-center">Le Mie Statistiche</h2>
            <div className = 'grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-4 w-11/12 lg:w-1/2'>
                {statsValue.map((member, index) => (
                        <Stat key={index} {...member}/>
                    ))}
            </div>
        </div>
            
        </>
    );
}

export default StatGrid;