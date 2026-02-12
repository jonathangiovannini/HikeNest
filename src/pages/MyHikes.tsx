import Navbar from "../components/Navbar";
import Footer from "../components/Footer.tsx";
import React, { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TerrainIcon from '@mui/icons-material/Terrain';
import useDocumentTitle from '../hooks/useDocumentTitle';
import DettagliGruppo from "../components/DettagliGruppo.tsx";

interface Gruppo {
    self: string;
    id: string;
    nome: string;
    idPercorso: string;
    esperienza: string;
    data: string;
    descrizione: string;
}
interface Percorso {
    id: string;   // Qui salveremo l'ID estratto
    self: string; // Qui terremo l'URL completo
    nome: string;
}

const UserGroups: React.FC = () => {
    useDocumentTitle("My Hikes - HikeNest");
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [myGroups, setMyGroups] = useState<Gruppo[]>([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    const [percorsi, setPercorsi] = useState<Percorso[]>([]);
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
                
                // --- MODIFICA QUI ---
                // Trasformiamo i dati per estrarre l'ID da 'self'
                const processedData = rawData.map((item: any) => {
                    // Divide la stringa per '/' e prende l'ultimo elemento non vuoto
                    // Es: "/api/v1/percorsi/123" -> ["api", "v1", "percorsi", "123"] -> "123"
                    const extractedId = item.self.split('/').filter(Boolean).pop();
                    
                    return {
                        ...item,
                        id: extractedId, // Sovrascriviamo l'id con quello estratto dall'URL
                        self: item.self  // Manteniamo il self originale
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
        const fetchMyGroups = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error("Token non trovato. Utente non autenticato.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/gruppi/gruppiUtente`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Errore: ${response.status} - Non è stato possibile recuperare i tuoi gruppi`);
                }

                const data = await response.json();
                setMyGroups(data);
            } catch (err) {
                console.error("Errore nel caricamento dei gruppi utente:", err);
            } finally {
                setLoading(false);
            }
        };


        fetchMyGroups();
    }, [apiUrl]);

    if (loading) return <div className="text-center py-10">Caricamento dei tuoi gruppi...</div>;

    // --- ERRORE ERA QUI: L'avevi messo fuori dal return ---
    
    return (
        <section className="w-full relative"> {/* Aggiunto relative per sicurezza */}
            <Navbar/>
            
            {/* --- CORREZIONE: Ora è qui dentro, quindi React lo mostrerà --- */}
            <DettagliGruppo
                groupId={selectedGroupId} 
                onClose={() => setSelectedGroupId(null)} 
            />
            {/* ----------------------------------------------------------- */}

            <h2 className="text-2xl font-bold text-mine-shaft-950 mb-6 text-center mt-6">My Hikes</h2>
            
            {myGroups.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-500 w-11/12 mx-auto">
                    Non sei ancora iscritto a nessun gruppo.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 mx-auto mb-10">
                    {myGroups.map((gruppo) => (
                        <div key={gruppo.id = gruppo.self.split('/')[3]} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-mine-shaft-950">{gruppo.nome}</h3>
                                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase 
                                    ${gruppo.esperienza === 'esperto' ? 'bg-red-100 text-red-800' : 
                                      gruppo.esperienza === 'medio' ? 'bg-blue-100 text-blue-800' : 
                                      'bg-green-100 text-green-800'}`}>
                                    {gruppo.esperienza}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <CalendarMonthIcon fontSize="inherit" className="text-mine-shaft-500" />
                                    {new Date(gruppo.data).toLocaleDateString('it-IT')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <TerrainIcon fontSize="inherit" className="text-mine-shaft-500" />
                                    {getNomePercorso(gruppo.idPercorso)}
                                </div>
                            </div>

                            <button 
                                onClick={() => setSelectedGroupId(gruppo.id)} 
                                className="text-mine-shaft-950 font-bold hover:tracking-widest transition-all text-sm"
                            >
                                VISUALIZZA DETTAGLI
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Footer/>
        </section>
    );
};

export default UserGroups;