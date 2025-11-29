import React from 'react';

interface CardProps {
    name: string;
    role: string;
    description: string;
    image: string;
    roleColor: string;
}

const Card: React.FC<CardProps> = ({ name, role, description, image, roleColor }) => {
    return (
        /*<div className="flex flex-col lg:w-3/12 p-6 dark:bg-gray-50 dark:text-gray-800 hover:shadow-lg">
            <img src={image} alt={name} className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 bg-gray-500 aspect-square " />
            <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <span className="block pb-2 text-sm dark:text-gray-600" style = {{color: roleColor}}>{role}</span>
                <p>{description}</p>
            </div>
        </div>*/
        <div className="group flex flex-col h-full bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">

            <div className="h-2 w-full" style={{ backgroundColor: roleColor }}></div>

            <div className="p-6 h-full flex flex-col items-center flex-grow text-center">

                <div
                    className="mb-4 p-1 rounded-full border-2"
                    style={{ borderColor: roleColor }}
                >
                    <img
                        src={image}
                        alt={name}
                        className="w-32 h-32 object-cover rounded-full"
                    />
                </div>

                <h2 className="text-xl font-bold text-mine-shaft-950 mb-2">{name}</h2>

                <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4"
                    style={{
                        backgroundColor: `${roleColor}15`,
                        color: roleColor
                    }}
                >
                    {role}
                </span>

                <p className="text-mine-shaft-600 text-sm leading-relaxed mb-6">
                    {description}
                </p>

                <div className="mt-auto flex gap-4 pt-4 border-t border-gray-100 w-full justify-center" >
                    <a className="text-gray-400 hover:text-blue-600 transition-colors " href = "#">
                        <i className="fa-brands fa-linkedin text-xl"></i>
                    </a>
                    <a className="text-gray-400 hover:text-gray-900 transition-colors" href = "#">
                        <i className="fa-brands fa-github text-xl"></i>
                    </a>
                    <a className="text-gray-400 hover:text-red-500 transition-colors " href = "#">
                        <i className="fa-regular fa-envelope text-xl"></i>
                    </a>
                </div>

            </div>
        </div>

    );
};

export default Card;