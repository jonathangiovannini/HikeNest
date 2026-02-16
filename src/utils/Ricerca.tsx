import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RicercaProps {
  onResultFound: (geojson: any) => void;
  onClear: () => void; 
}

interface Suggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function Ricerca({ onResultFound, onClear }: RicercaProps) {
  const [query, setQuery] = useState('');
  const map = useMap();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
          const response = await fetch(url);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Errore autocomplete:", error);
        }
      } else {
        setSuggestions([]); 
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [query]);

  const searchPlace = async (searchText: string) => {
    if (!searchText) return;

    setSuggestions([]); 

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&polygon_geojson=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);

        map.flyTo([lat, lon], 13);

        if (result.geojson) {
            onResultFound(result.geojson);
        }
      } else {
        alert('Nessun risultato trovato');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    searchPlace(query);
  };

  const handleClear = () => {
    setQuery('');      
    onClear();          
    map.setZoom(10);    
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setQuery(suggestion.display_name); 
    setSuggestions([]); 
    searchPlace(suggestion.display_name); 
  };


  return (
    <div className=" hidden lg:absolute inset-0 lg:flex flex-col justify-end items-center lg:justify-start lg:items-end z-1000 pointer-events-none">
       <div 
            className="leaflet-control leaflet-bar border-none! shadow-none! pointer-events-auto w-11/12 lg:w-auto flex justify-center lg:justify-end mb-32 lg:mb-0 lg:mt-6 lg:mr-8" 
            style={{ display: 'flex', background: 'transparent' }}
        >
        <form 
            onSubmit={handleSearchSubmit} 
            style={{ display: 'flex', alignItems: 'center' }} 
            className='bg-mine-shaft-50 border border-mine-shaft-950 w-full lg:w-150 h-12 justify-evenly rounded-lg shadow-lg'
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
        {suggestions.length > 0 && (
          <ul className="absolute top-14 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden z-10">
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.place_id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800 border-b border-gray-100 last:border-none truncate"
                title={suggestion.display_name}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
       </div>
    </div>
  );
}