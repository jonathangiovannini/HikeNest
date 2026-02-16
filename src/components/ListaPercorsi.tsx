import { useState, useEffect, useMemo } from 'react';
import { 
  Mountain, 
  Search, 
  MapPin, 
  Ruler, 
  X, 
  ChevronRight,
  Loader2 
} from 'lucide-react';
import DettagliPercorso from './DettagliPercorso.tsx'; 

interface ListaPercorsiProps {
    onClose: () => void;
}

interface Percorso {
    id: string;
    self: string;
    nome: string;
    difficolta: string;
    lunghezzaKm: number;
    localitaPartenza: string;
}

export default function ListaPercorsi({ onClose }: ListaPercorsiProps) {
    const [percorsi, setPercorsi] = useState<Percorso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [selectedPercorsoId, setSelectedPercorsoId] = useState<string | null>(null);

    const [searchName, setSearchName] = useState('');
    const [filterDifficolta, setFilterDifficolta] = useState('');
    const [filterLocalita, setFilterLocalita] = useState('');
    const [filterRangeKm, setFilterRangeKm] = useState('');

    useEffect(() => {
        const fetchPercorsi = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/percorsi`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) throw new Error('Errore nel recupero dei dati');
                const data = await response.json();
                
                const processedData = data.map((p: any) => ({
                    ...p,
                    id: p.self.split('/').filter(Boolean).pop()
                }));
                
                setPercorsi(processedData);
            } catch (err) {
                setError('Impossibile caricare i percorsi.');
            } finally {
                setLoading(false);
            }
        };
        fetchPercorsi();
    }, []);

    const filteredPercorsi = useMemo(() => {
        return percorsi.filter(p => {
            const matchName = p.nome.toLowerCase().includes(searchName.toLowerCase());
            const matchDiff = filterDifficolta ? p.difficolta === filterDifficolta : true;
            const matchLoc = p.localitaPartenza.toLowerCase().includes(filterLocalita.toLowerCase());
            
            let matchKm = true;
            if (filterRangeKm === 'under10') matchKm = p.lunghezzaKm < 10;
            else if (filterRangeKm === '10-30') matchKm = p.lunghezzaKm >= 10 && p.lunghezzaKm <= 30;
            else if (filterRangeKm === '30-50') matchKm = p.lunghezzaKm > 30 && p.lunghezzaKm <= 50;
            else if (filterRangeKm === 'over50') matchKm = p.lunghezzaKm > 50;

            return matchName && matchDiff && matchLoc && matchKm;
        });
    }, [percorsi, searchName, filterDifficolta, filterLocalita, filterRangeKm]);

    const getBadgeColor = (diff: string) => {
        switch(diff.toLowerCase()) {
            case 'facile': case 't': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'medio': case 'e': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'difficile': case 'ee': return 'bg-rose-100 text-rose-800 border-rose-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="absolute inset-0 z-2000 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            
            {selectedPercorsoId && (
                <DettagliPercorso 
                    percorsoId={selectedPercorsoId} 
                    onClose={() => setSelectedPercorsoId(null)} 
                />
            )}

            <div className="bg-white w-full max-w-4xl h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                
                <div className="bg-white p-5 border-b flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Mountain className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Lista Percorsi</h2>
                            <p className="text-xs text-slate-500">{filteredPercorsi.length} risultati trovati</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="bg-slate-50 p-4 border-b shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Cerca nome..." 
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <select 
                            value={filterDifficolta}
                            onChange={(e) => setFilterDifficolta(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Tutte le difficoltà</option>
                            <option value="facile">facile</option>
                            <option value="medio">medio</option>
                            <option value="difficile">difficile</option>
                        </select>

                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Partenza..." 
                                value={filterLocalita}
                                onChange={(e) => setFilterLocalita(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <select 
                            value={filterRangeKm}
                            onChange={(e) => setFilterRangeKm(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Tutte le distanze</option>
                            <option value="under10">Sotto i 10 km</option>
                            <option value="10-30">10 - 30 km</option>
                            <option value="30-50">30 - 50 km</option>
                            <option value="over50">Oltre 50 km</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-y-auto p-4 flex-1 bg-white">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-40 text-slate-400 gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            <p className="text-sm">Caricamento in corso...</p>
                        </div>
                    ) : error ? (
                        <div className="text-rose-600 text-center p-6 bg-rose-50 rounded-xl border border-rose-100">
                            {error}
                        </div>
                    ) : filteredPercorsi.length === 0 ? (
                        <div className="text-center py-16">
                            <Search className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">Nessun percorso trovato.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredPercorsi.map((percorso) => (
                                <div key={percorso.id} className="group border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{percorso.nome}</h3>
                                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${getBadgeColor(percorso.difficolta)}`}>
                                                {percorso.difficolta}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{percorso.localitaPartenza}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Ruler className="w-3.5 h-3.5" />
                                                <span>{percorso.lunghezzaKm} km</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => setSelectedPercorsoId(percorso.id)}
                                        className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm group/btn"
                                    >
                                        Dettagli Percorso
                                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}