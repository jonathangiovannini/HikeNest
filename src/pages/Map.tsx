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

        

        <div style={{height: '100dvh', width: '100%' }}>
            <MapContainer  scrollWheelZoom ={false} center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
                
                <div className = "h-[calc(100dvh-110px)] flex flex-row justify-center lg:justify-start" >
                    <button 
                        onClick={() => setIsListOpen(true)}
                        className="mt-auto lg:ml-24 lg:mt-6 z-1001 bg-mine-shaft-50 text-mine-shaft-950 border border-mine-shaft-950 rounded-lg  h-12 hover:bg-mine-shaft-100 shadow-lg font-semibold transition-all flex items-center gap-2 w-11/12 lg:w-1/3"
                    >
                    <span className="text-xl"></span> Lista dei percorsi
                    </button>
                    <Ricerca 
                        onResultFound={(data) => setSentieroData(data)} 
                        onClear={() => setSentieroData(null)}
                    />
                </div>
                {isListOpen && (
                        <ListaPercorsi onClose={() => setIsListOpen(false)} />
                )}

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