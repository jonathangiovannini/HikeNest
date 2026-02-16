import type { ReactNode } from 'react';
import React from 'react';

interface StatProps {
    label: string,
    value: string | number | null,
    icon: ReactNode,
}

const Stat : React.FC<StatProps> = ({label, value, icon}) => {
    return(
        <div className = 'flex justify-center w-11/12 lg:w-full shadow-md border border-mine-shaft-200  rounded-2xl items-center'>
            <div className = 'my-6 mr-6'>
                <div className = 'bg-green-300/30 text-green-800 text-4xl flex justify-center items-center w-16 h-16 rounded-full'>
                    {icon}
                </div>
            </div>
            <div>
                <h2 className = ''>{label}</h2>
                <p className = 'font-bold text-4xl'>{value}</p>
            </div>
        </div>
    );
}

export default Stat;