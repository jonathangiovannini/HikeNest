import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import CloseIcon from '@mui/icons-material/Close';

interface FormGruppoProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Percorso {
    id: string;   
    self: string;
    nome: string;
}

const wrapperInputTextStyle = "flex flex-col gap-1 relative"; 
const inputTxtStyle = "w-full px-4 py-3 bg-white border border-mine-shaft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mine-shaft-950 focus:border-transparent transition-all";

const FormGruppo: React.FC<FormGruppoProps> = ({ isOpen, onClose }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [percorsi, setPercorsi] = useState<Percorso[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const [groupData, setGroupData] = useState({
        nome: "",
        idPercorso: "", 
        esperienza: "medio",
        data: "",
        idCreatore: localStorage.getItem('userId'), 
        descrizione: ""
    });

    useEffect(() => {
        if (isOpen) {
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
        }
    }, [isOpen, apiUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGroupData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(true);
        setGroupData(prev => ({ ...prev, idPercorso: "" }));
    };

    const selectPercorso = (percorso: Percorso) => {
        setGroupData(prev => ({ ...prev, idPercorso: percorso.id }));
        setSearchTerm(percorso.nome); 
        setShowDropdown(false); 
    };

    const filteredPercorsi = percorsi.filter(p => 
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!groupData.idPercorso) {
            alert("Per favore seleziona un percorso valido dalla lista.");
            return;
        }

        try {
            console.log("Invio ID percorso:", groupData.idPercorso); 
            
            const response = await fetch(`${apiUrl}/gruppi`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    nome: groupData.nome,
                    idPercorso: groupData.idPercorso, 
                    esperienza: groupData.esperienza,
                    data: groupData.data,
                    idCreatore: localStorage.getItem('userId'), 
                    descrizione: groupData.descrizione
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                alert(`Errore: ${response.status} ${errorData.message || ''}`);
                return;
            }

            alert("Gruppo creato!");
            setGroupData({
                nome: "",
                idPercorso: "",
                esperienza: "medio",
                data: "",
                idCreatore: localStorage.getItem('userId'),
                descrizione: ""
            });
            setSearchTerm("");
            onClose();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl pointer-events-auto relative mx-4 max-h-[90vh] overflow-y-auto">
                            
                            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <CloseIcon />
                            </button>

                            <h2 className="text-2xl font-bold text-mine-shaft-950 mb-6 text-center">Crea Un Gruppo</h2>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
                                <div className={wrapperInputTextStyle}>
                                    <label className="font-semibold text-sm">Nome Gruppo</label>
                                    <input type="text" name="nome" required value={groupData.nome} onChange={handleChange} className={inputTxtStyle} />
                                </div>

                                <div className={wrapperInputTextStyle}>
                                    <label className="font-semibold text-sm">Percorso</label>
                                    <input 
                                        type="text" 
                                        placeholder="Cerca un percorso..."
                                        value={searchTerm} 
                                        onChange={handleSearchChange}
                                        onFocus={() => setShowDropdown(true)}
                                        className={inputTxtStyle} 
                                        autoComplete="off"
                                    />
                                    
                                    {showDropdown && searchTerm && (
                                        <ul className="absolute top-[105%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                                            {filteredPercorsi.length > 0 ? (
                                                filteredPercorsi.map((percorso) => (
                                                    <li 
                                                        key={percorso.id}
                                                        onClick={() => selectPercorso(percorso)}
                                                        className="px-4 py-2 hover:bg-mine-shaft-50 cursor-pointer text-sm text-gray-700 transition-colors border-b border-gray-100 last:border-0"
                                                    >
                                                        {percorso.nome}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-sm text-gray-400">
                                                    Nessun percorso trovato
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                    
                                    {groupData.idPercorso && (
                                        <span className="text-xs text-green-600 font-medium">✓ Percorso selezionato</span>
                                    )}
                                </div>
                                
                                <div className={wrapperInputTextStyle}>
                                    <label className="font-semibold text-sm">Data</label>
                                    <input type="datetime-local" name="data" required value={groupData.data} onChange={handleChange} className={inputTxtStyle} />
                                </div>

                                <div className={wrapperInputTextStyle}>
                                    <label className="font-semibold text-sm">Descrizione</label>
                                    <textarea name="descrizione" value={groupData.descrizione} onChange={handleChange} rows={3} className={`${inputTxtStyle} resize-none`} />
                                </div>

                                <div className={wrapperInputTextStyle}>
                                    <label className="font-semibold text-sm mb-2">Livello Esperienza</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['neofita', 'medio', 'esperto'].map((opt) => (
                                            <label 
                                                key={opt} 
                                                className={`cursor-pointer px-2 py-3 text-center text-sm rounded-lg border font-semibold transition-all ${
                                                    groupData.esperienza === opt 
                                                    ? 'bg-mine-shaft-950 text-white border-transparent' 
                                                    : 'bg-white text-gray-600 border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="esperienza"
                                                    value={opt}
                                                    className="hidden"
                                                    checked={groupData.esperienza === opt}
                                                    onChange={handleChange}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-6 py-3 bg-mine-shaft-950 text-white font-bold rounded-lg hover:bg-mine-shaft-800 shadow-md">
                                    Crea il gruppo
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FormGruppo;