import { useState } from 'react';
import { useMap } from 'react-leaflet';

interface RicercaProps {
  onResultFound: (geojson: any) => void;
  onClear: () => void; // Nuova funzione per pulire
}

export default function Ricerca({ onResultFound, onClear }: RicercaProps) {
  const [query, setQuery] = useState('');
  const map = useMap();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&polygon_geojson=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);

        map.flyTo([lat, lon], 13);

        if (result.geojson) {
            onResultFound(result.geojson); // Passiamo i dati al padre
        }
      } else {
        alert('Nessun risultato trovato');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setQuery('');      
    onClear();          
    map.setZoom(10);    
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-end items-center lg:justify-start lg:items-end z-1000 pointer-events-none">
       <div 
            className="leaflet-control leaflet-bar border-none! shadow-none! pointer-events-auto w-11/12 lg:w-auto flex justify-center lg:justify-end mb-32 lg:mb-0 lg:mt-6 lg:mr-8" 
            style={{ display: 'flex', background: 'transparent' }}
        >
        <form 
            onSubmit={handleSearch} 
            style={{ display: 'flex', alignItems: 'center' }} 
            className='bg-mine-shaft-50 border border-mine-shaft-950 w-full lg:w-96 h-12 justify-evenly rounded-lg shadow-lg'
        >
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Cerca sentiero"
                className = 'pl-3 text-sm w-full h-full text-mine-shaft-950 bg-transparent outline-none border-none focus:ring-0 rounded-l-lg'
            />
             <button type="submit" className="hidden"></button>
             
             {query && (
               <button 
                 type="button" 
                 onClick={handleClear}
                 className = 'text-mine-shaft-950 font-bold pr-4 hover:text-red-600 transition-colors'
               >
                 X
               </button>
             )}
        </form>
       </div>
    </div>
  );
}