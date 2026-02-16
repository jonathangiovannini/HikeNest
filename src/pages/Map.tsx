import { useState } from 'react'; 
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css';
import Ricerca from '../utils/Ricerca';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListaPercorsi from '../components/ListaPercorsi';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Map() {
  const position: [number, number] = [46.5, 12.0]; 
  
  const [sentieroData, setSentieroData] = useState<any>(null);
  
  const [isListOpen, setIsListOpen] = useState(false);

  useDocumentTitle("Map - HikeNest");

  return (
    <>
        <Navbar/>
        
        <div className="absolute top-[NavbarHeight] w-full h-8 bg-linear-to-b from-black/20 to-transparent z-1000 pointer-events-none"></div>

        <button 
            onClick={() => setIsListOpen(true)}
            className="absolute top-28 left-35 z-1001 bg-white text-mine-shaft-950 border border-gray-300 rounded-lg px-60 py-4 hover:bg-gray-50 shadow-lg font-semibold transition-all flex items-center gap-2"
        >
            <span className="text-xl"></span> Lista dei percorsi
        </button>

        {isListOpen && (
            <ListaPercorsi onClose={() => setIsListOpen(false)} />
        )}

        <div style={{height: '100dvh', width: '100%' }}>
            <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
                
                <Ricerca 
                    onResultFound={(data) => setSentieroData(data)} 
                    onClear={() => setSentieroData(null)}
                />

                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {!sentieroData && (
                    <TileLayer
                        attribution='&copy; Waymarked Trails'
                        url="https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"
                        opacity={0.6} 
                    />
                )}

                {sentieroData && (
                    <GeoJSON 
                        key={JSON.stringify(sentieroData)} 
                        data={sentieroData} 
                        style={{ color: '#ff0000', weight: 6, opacity: 0.9 }}
                    />
                )}

            </MapContainer>
        </div>
        <Footer/>
    </>
  );
}