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
        /*<article className="
      flex flex-col items-center text-center justify-center
      p-4 pb-0 m-2 flex-1 min-w-0
      h-auto
      backdrop-blur-lg bg-white/30
      rounded-4xl
      overflow-hidden
      shadow-lg
      hover:shadow-2xl
      transition-shadow duration-300x
    ">
            <img
                src={image}
                alt={name}
                className="h-32 sm:h-36 md:h-40 object-contain p-4"
            />
            <div className="border-t border-black w-full min-h-[200px] sm:min-h-[220px] md:h-72 p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-4">{name}</h3>
                <h4 className={`text-base sm:text-lg mb-3 font-semibold`} style={{ color: roleColor }}>
                    {role}
                </h4>
                <p className="text-sm sm:text-lg text-gray-700 ">
                    {description}
                </p>
            </div>
        </article>*/
        <div className="flex flex-col lg:w-1/3 p-6 dark:bg-gray-50 dark:text-gray-800 hover:shadow-lg">
            <img src={image} alt={name} className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 bg-gray-500 aspect-square " />
            <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <span className="block pb-2 text-sm dark:text-gray-600" style = {{color: roleColor}}>{role}</span>
                <p>{description}</p>
            </div>
        </div>

    );
};

export default Card;