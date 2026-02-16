import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Section from "../components/Section.tsx";
import FormGruppo from "../components/FormGruppo.tsx";
import Separator from "../components/Separator.tsx";
import useDocumentTitle from "../hooks/useDocumentTitle.ts";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TerrainIcon from '@mui/icons-material/Terrain';
import DettagliGruppo from '../components/DettagliGruppo.tsx';


interface Gruppo {
    self: string;
    id: string;
    nome: string;
    idPercorso: string;
    nomePercorso: string;
    esperienza: string;
    data: string;
    descrizione: string;
}
interface Percorso {
    id: string;   
    self: string; 
    nome: string;
}

function Groups() {
    useDocumentTitle('Gruppi - HikeNest');
    
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [percorsi, setPercorsi] = useState<Percorso[]>([]);
    const [gruppi, setGruppi] = useState<Gruppo[]>([]);
    const [loading, setLoading] = useState(true);

    const [FormAperta, setForm] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [difficoltaFiltro, setDifficoltaFiltro] = useState('Tutti');
    const [dataFiltro, setDataFiltro] = useState("");
    const [searchPercorso, setSearchPercorso] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;

    const getNomePercorso = (idPercorsoDelGruppo: string) => {
        // Estraiamo l'ID nel caso idPercorso fosse un URL intero
        const idPulito = idPercorsoDelGruppo.split('/').filter(Boolean).pop();
        const percorsoTrovato = percorsi.find(p => p.id === idPulito);
        return percorsoTrovato ? percorsoTrovato.nome : "Caricamento percorso...";
    };

    const fetchPercorsi = async () => {
        try {
            const response = await fetch(`${apiUrl}/percorsi`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const rawData = await response.json();
                const processedData = rawData.map((item: any) => {
                    const extractedId = item.self.split('/').filter(Boolean).pop();
                    
                    return {
                        ...item,
                        id: extractedId,
                        self: item.self  
                    };
                });
                
                setPercorsi(processedData);
            } else {
                console.error("Errore nel recupero dei percorsi");
            }
        } catch (error) {
            console.error("Errore di rete:", error);
        }
    };
    fetchPercorsi();
    useEffect(() => {
        const fetchGruppi = async () => {
            try {
                const response = await fetch(`${apiUrl}/gruppi`,{
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                });
                if (!response.ok) throw new Error("Errore API");
                const data = await response.json();
                setGruppi(data);
            } catch (err) {
                console.error("Errore nel caricamento:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGruppi();
    }, [apiUrl]);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const gruppiFiltrati = gruppi.filter(g => {
    g.id = g.self.split('/').pop() || "";
    const nomePercorsoAssociato = getNomePercorso(g.idPercorso).toLowerCase();
    const matchNome = g.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPercorso = nomePercorsoAssociato.includes(searchPercorso.toLowerCase());
    const matchData = dataFiltro === "" || g.data.startsWith(dataFiltro);
    const matchDifficolta = difficoltaFiltro === 'Tutti' || g.esperienza === difficoltaFiltro;
    
    return matchNome && matchPercorso && matchDifficolta && matchData;
});

    return (
        <div className="min-h-screen bg-mineshaft-50">
            <Navbar />
            
            <Section>
                <h1 className="text-center text-mine-shaft-950 text-6xl lg:text-8xl p-12 font-bold ">
                    Trova la tua comunità
                </h1>
                <p className="text-center p-8 text-mine-shaft-950 text-xl max-w-7xl mx-auto font-bold">
                    Entra in contatto con altri escursionisti, unisciti ad avventure di
                    gruppo e scopri nuovi sentieri insieme.
                </p>
            </Section>

            <div className="w-full flex justify-center mb-4">
                <button
                    className="text-mine-shaft-50 font-bold bg-mine-shaft-950 w-64 h-16 rounded-lg cursor-pointer transition transform hover:scale-105 active:scale-95 shadow-xl"
                    onClick={() => setForm(true)}
                >
                    + CREA UN GRUPPO
                </button>
            </div>

            <FormGruppo isOpen={FormAperta} onClose={() => setForm(false)} />
            <DettagliGruppo
                groupId={selectedGroupId} 
                onClose={() => setSelectedGroupId(null)} 
            />
            
            <Separator />

            <div className="w-11/12 mt-8 bg-mineshaft-50 rounded-xl mx-auto shadow-lg p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col w-full">
                        <label className="text-xs font-bold text-gray-500 mb-1 text-uppercase">GRUPPO</label>
                        <input
                            type="text"
                            className='h-12 w-full lg:w-4/5 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mine-shaft-950 outline-none transition-all'
                            placeholder="Cerca un gruppo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col w-full">
                        <label className="text-xs font-bold text-gray-500 mb-1 text-uppercase" htmlFor=''>PERCORSO</label>
                        <input
                            type="text"
                            className='h-12 w-full lg:w-4/5 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mine-shaft-950 outline-none transition-all'
                            placeholder="Filtra per percorso..."
                            value={searchPercorso}
                            onChange={(e) => setSearchPercorso(e.target.value)}
                        />
                    </div>

                    <div className='hidden lg:flex gap-6 items-center'>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 mb-1">LIVELLO</label>
                            <select 
                                className='h-12 w-32 rounded-md border-gray-200 outline-none focus:ring-1 focus:ring-mine-shaft-950'
                                value={difficoltaFiltro}
                                onChange={(e) => setDifficoltaFiltro(e.target.value)}
                            >
                                <option value="Tutti">Tutti</option>
                                <option value="neofita">neofita</option>
                                <option value="medio">medio</option>
                                <option value="esperto">esperto</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 mb-1 text-uppercase">DATA</label>
                            <input 
                                type="date"
                                className='h-12 w-44 rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-mine-shaft-950 px-3'
                                value={dataFiltro}
                                onChange={(e) => setDataFiltro(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="lg:hidden w-full flex justify-end">
                        <IconButton onClick={toggleMenu} color="inherit">
                            <FilterAltIcon /> <span className="text-sm ml-1 font-bold">Filtri</span>
                        </IconButton>
                    </div>
                </div>
            </div>

            <main className="w-11/12 mx-auto mt-12 mb-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mine-shaft-950"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gruppiFiltrati.length > 0 ? (
                            gruppiFiltrati.map((g) => (
                                <div key={g.id} className="bg-white rounded-t-2xl shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-mine-shaft-950 leading-tight">{g.nome}</h3>
                                            <span className={`px-2 py-1 text-[10px] font-black uppercase ${
                                                g.esperienza === 'esperto' ? 'bg-red-100 text-red-600' : g.esperienza === 'medio'? 'bg-blue-100 text-blue-600' :'bg-green-100 text-green-600'
                                            }`}>
                                                {g.esperienza}
                                            </span>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-500 text-sm gap-2">
                                                <CalendarMonthIcon fontSize="inherit" />
                                                {new Date(g.data).toLocaleDateString('it-IT')}
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm gap-2">
                                                <TerrainIcon fontSize="inherit" />
                                                Percorso: {getNomePercorso(g.idPercorso)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2 italic">
                                            {g.descrizione || "Nessuna descrizione."}
                                        </p>
                                    </div>
                                    <div className="mt-auto p-4 bg-gray-50 border-t flex justify-center ">
                                        <button 
                                            onClick={() => setSelectedGroupId(g.id)} 
                                            className="text-mine-shaft-950 font-bold hover:tracking-widest transition-all"
                                        >
                                            VISUALIZZA DETTAGLI
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-400">
                                Nessun gruppo trovato con questi filtri.
                            </div>
                        )}
                    </div>
                )}
            </main>

            <div className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-all ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className={`absolute bottom-0 w-full bg-mine-shaft-50 rounded-t-3xl p-8 transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Filtra Risultati</h2>
                        <IconButton onClick={toggleMenu}><CloseIcon /></IconButton>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block font-bold mb-3 text-md">Livello Esperienza</label>
                            <div className="flex gap-2">
                                {['Tutti', 'neofita', 'medio', 'esperto'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setDifficoltaFiltro(opt)}
                                        className={`flex-1 py-3 rounded-lg border font-bold text-sm transition-all ${
                                            difficoltaFiltro === opt ? 'bg-mine-shaft-950 text-white border-transparent' : 'bg-mine-shaft-50 text-gray-400 border-gray-200'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className = "flex flex-col gap-2">
                            <label className="text-md font-bold text-mineshaft-950 mb-1 ">Data</label>
                            <input 
                                type="date"
                                className='h-12 w-44 rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-mine-shaft-950 px-3'
                                value={dataFiltro}
                                onChange={(e) => setDataFiltro(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={toggleMenu}
                            className="w-full py-4 bg-mine-shaft-950 text-white rounded-xl font-bold mt-4 shadow-lg"
                        >
                            APPLICA FILTRI
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Groups;