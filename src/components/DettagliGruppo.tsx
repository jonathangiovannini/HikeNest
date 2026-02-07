import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TerrainIcon from '@mui/icons-material/Terrain';
import PersonIcon from '@mui/icons-material/Person';

interface DettaglioProps {
    groupId: string | null;
    onClose: () => void;
}

const inputTxtStyle = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none cursor-default text-gray-700 font-medium";
const labelStyle = "font-bold text-xs uppercase text-gray-500 mb-1 flex items-center gap-1";

const DettagliGruppo: React.FC<DettaglioProps> = ({ groupId, onClose }) => {
    const [data, setData] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    // Caricamento dati iniziali
    useEffect(() => {
        if (groupId) {
            fetch(`${apiUrl}/gruppi/${groupId}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
        } else {
            setData(null);
        }
    }, [groupId, apiUrl]);

    // Funzione per unirsi al gruppo
    const gestisciPartecipazione = async () => {
        if (!groupId) return;

        try {
            setIsSubmitting(true);
            const response = await fetch(`${apiUrl}/gruppi/${groupId}/persone`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Errore durante l'iscrizione");
            }

            // Se l'iscrizione ha successo, ricarichiamo i dati per aggiornare la lista partecipanti
            const updatedRes = await fetch(`${apiUrl}/gruppi/${groupId}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            });
            const updatedData = await updatedRes.json();
            setData(updatedData);
            
            alert("Ti sei unito al gruppo con successo!");

        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {groupId && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="bg-white w-full max-w-5xl p-8 rounded-3xl shadow-2xl pointer-events-auto relative max-h-[90vh] overflow-y-auto">
                            
                            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
                                <CloseIcon fontSize="large" />
                            </button>

                            <h2 className="text-3xl font-black text-mine-shaft-950 mb-8 border-b pb-4">Dettagli dell'Escursione</h2>

                            {data ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className={labelStyle}>Nome Gruppo</label>
                                        <input type="text" readOnly value={data.nome} className={`${inputTxtStyle} text-lg font-bold border-l-4 border-l-mine-shaft-950`} />
                                    </div>

                                    <div>
                                        <label className={labelStyle}><TerrainIcon fontSize="inherit"/> ID Percorso</label>
                                        <input type="text" readOnly value={data.idPercorso} className={inputTxtStyle} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}><CalendarMonthIcon fontSize="inherit"/> Data Hike</label>
                                        <input type="text" readOnly value={new Date(data.data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })} className={inputTxtStyle} />
                                    </div>

                                    <div>
                                        <label className={labelStyle}>Livello Esperienza</label>
                                        <div className={`py-3 px-4 rounded-lg font-black uppercase text-center text-sm border 
                                            ${data.esperienza === 'esperto' ? 'bg-red-50 text-red-600 border-red-200' : 
                                              data.esperienza === 'medio' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                                              'bg-green-50 text-green-600 border-green-200'}`}>
                                            {data.esperienza}
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelStyle}><PersonIcon fontSize="inherit"/> Organizzatore (ID)</label>
                                        <input type="text" readOnly value={data.idCreatore} className={inputTxtStyle} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className={labelStyle}>Descrizione dell'attività</label>
                                        <textarea readOnly value={data.descrizione} rows={4} className={`${inputTxtStyle} resize-none italic bg-gray-50/50`} />
                                    </div>

                                    <div className="md:col-span-2 pt-4">
                                        <button 
                                            onClick={gestisciPartecipazione}
                                            disabled={isSubmitting}
                                            className={`w-full py-4 text-white font-black rounded-xl shadow-xl transition-all uppercase tracking-tighter text-lg active:scale-95 flex justify-center items-center
                                                ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-mine-shaft-950 hover:bg-mine-shaft-800'}`}
                                        >
                                            {isSubmitting ? (
                                                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                "Unisciti al gruppo"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-20 space-y-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mine-shaft-950"></div>
                                    <p className="text-gray-500 font-bold animate-pulse">Caricamento dettagli...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DettagliGruppo;