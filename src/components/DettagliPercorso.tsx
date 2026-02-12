import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mountain, MapPin, Ruler, AlertTriangle, 
  Star, MessageSquare, Loader2, Send, Plus 
} from 'lucide-react';

interface DettagliPercorsoProps {
    percorsoId: string;
    onClose: () => void;
}

// ... interfacce precedenti (Percorso, Recensione, Segnalazione) ...

const DettagliPercorso: React.FC<DettagliPercorsoProps> = ({ percorsoId, onClose }) => {
    const [percorso, setPercorso] = useState<any>(null);
    const [recensioni, setRecensioni] = useState<any[]>([]);
    const [segnalazioni, setSegnalazioni] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Stati per i Form
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReportForm, setShowReportForm] = useState(false);
    const [reviewData, setReviewData] = useState({ testo: '', valutazione: 5 });
    const [reportData, setReportData] = useState({ testo: '' });

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const headers = { "Authorization": `Bearer ${token}` };
            const [resP, resS, resR] = await Promise.all([
                fetch(`${apiUrl}/percorsi/${percorsoId}`, { headers }),
                fetch(`${apiUrl}/percorsi/${percorsoId}/segnalazioni`, { headers }),
                fetch(`${apiUrl}/percorsi/${percorsoId}/recensioni`, { headers })
            ]);
            setPercorso(await resP.json());
            setSegnalazioni(await resS.json());
            setRecensioni(await resR.json());
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };

    useEffect(() => { if (percorsoId) fetchData(); }, [percorsoId]);

    // --- LOGICA DI INVIO ---
    const inviaRecensione = async () => {
        if (!reviewData.testo) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`${apiUrl}/percorsi/${percorsoId}/recensioni`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(reviewData)
            });
            if (res.ok) {
                setReviewData({ testo: '', valutazione: 5 });
                setShowReviewForm(false);
                fetchData(); // Ricarica la lista
            }
        } catch (err) { alert("Errore nell'invio"); }
        finally { setIsSubmitting(false); }
    };

    const inviaSegnalazione = async () => {
        if (!reportData.testo) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`${apiUrl}/percorsi/${percorsoId}/segnalazioni`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(reportData)
            });
            if (res.ok) {
                setReportData({ testo: '' });
                setShowReportForm(false);
                fetchData();
            }
        } catch (err) { alert("Errore nell'invio"); }
        finally { setIsSubmitting(false); }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                    
                    {/* Header */}
                    <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-xl"><Mountain className="w-6 h-6 text-white" /></div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase italic">Info Percorso</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-6 h-6 text-slate-400" /></button>
                    </div>

                    <div className="overflow-y-auto p-6 space-y-8">
                        {loading ? ( <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto w-10 h-10 text-blue-600" /></div> ) : (
                            <>
                                {/* Info Base */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 col-span-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Nome</p>
                                        <p className="text-xl font-bold">{percorso?.nome}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><Ruler className="w-4 h-4 mb-1 text-blue-500" /><p className="font-bold">{percorso?.lunghezzaKm} km</p></div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><MapPin className="w-4 h-4 mb-1 text-rose-500" /><p className="font-bold">{percorso?.localitaPartenza}</p></div>
                                </div>

                                {/* --- SEZIONE SEGNALAZIONI --- */}
                                <section>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                                            <h3 className="font-black text-slate-800 uppercase text-sm">Segnalazioni</h3>
                                        </div>
                                        <button 
                                            onClick={() => setShowReportForm(!showReportForm)}
                                            className="text-xs font-bold flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors"
                                        >
                                            {showReportForm ? <X className="w-3 h-3"/> : <Plus className="w-3 h-3"/>}
                                            {showReportForm ? 'Annulla' : 'Segnala Problema'}
                                        </button>
                                    </div>

                                    {showReportForm && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                                            <textarea 
                                                className="w-full p-3 rounded-xl border-none outline-none text-sm placeholder:italic"
                                                placeholder="Cosa c'è che non va sul sentiero?"
                                                value={reportData.testo}
                                                onChange={(e) => setReportData({ testo: e.target.value })}
                                            />
                                            <button 
                                                disabled={isSubmitting || !reportData.testo}
                                                onClick={inviaSegnalazione}
                                                className="mt-2 w-full bg-amber-600 text-white font-bold py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-amber-700 disabled:bg-slate-300"
                                            >
                                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
                                                Invia Segnalazione
                                            </button>
                                        </motion.div>
                                    )}

                                    <div className="space-y-2">
                                        {segnalazioni.map((s, i) => (
                                            <div key={i} className="p-3 bg-slate-50 rounded-xl text-sm border-l-4 border-amber-400">
                                                <p className="text-slate-700">{s.testo}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* --- SEZIONE RECENSIONI --- */}
                                <section>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="w-5 h-5 text-blue-500" />
                                            <h3 className="font-black text-slate-800 uppercase text-sm">Recensioni</h3>
                                        </div>
                                        <button 
                                            onClick={() => setShowReviewForm(!showReviewForm)}
                                            className="text-xs font-bold flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors"
                                        >
                                            {showReviewForm ? <X className="w-3 h-3"/> : <Plus className="w-3 h-3"/>}
                                            {showReviewForm ? 'Annulla' : 'Scrivi Recensione'}
                                        </button>
                                    </div>

                                    {showReviewForm && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                                            <div className="flex items-center gap-2 mb-3">
                                                <label className="text-xs font-black uppercase text-blue-700">Valutazione:</label>
                                                <select 
                                                    value={reviewData.valutazione}
                                                    onChange={(e) => setReviewData({...reviewData, valutazione: Number(e.target.value)})}
                                                    className="bg-white border-none rounded-md text-sm font-bold p-1 outline-none"
                                                >
                                                    {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} Stelle</option>)}
                                                </select>
                                            </div>
                                            <textarea 
                                                className="w-full p-3 rounded-xl border-none outline-none text-sm"
                                                placeholder="Com'è stata la tua esperienza?"
                                                value={reviewData.testo}
                                                onChange={(e) => setReviewData({...reviewData, testo: e.target.value})}
                                            />
                                            <button 
                                                disabled={isSubmitting || !reviewData.testo}
                                                onClick={inviaRecensione}
                                                className="mt-2 w-full bg-blue-600 text-white font-bold py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700 disabled:bg-slate-300"
                                            >
                                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
                                                Pubblica Recensione
                                            </button>
                                        </motion.div>
                                    )}

                                    <div className="space-y-4">
                                        {recensioni.map((r, i) => (
                                            <div key={i} className="p-4 border border-slate-100 rounded-2xl shadow-sm">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-[10px] font-bold text-slate-400">UTENTE {r.idUtente}</span>
                                                    <div className="flex gap-0.5 text-blue-500">
                                                        {[...Array(r.valutazione)].map((_, idx) => <Star key={idx} className="w-3 h-3 fill-current"/>)}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 italic">"{r.testo}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DettagliPercorso;