import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface FormGruppoProps {
    isOpen: boolean;
    onClose: () => void;
}

const wrapperInputTextStyle = "grid grid-cols-1";
const inputTxtStyle = "w-full px-4 py-3 bg-white border border-mine-shaft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mine-shaft-950 focus:border-transparent transition-all";



const FormGruppo: React.FC<FormGruppoProps> = ({ isOpen, onClose }) => {

    const [category, setCategory] = useState('Info');
    //const [partenza, setPartenza] = useState('');


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
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl pointer-events-auto relative mx-4">

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <CloseIcon />
                            </button>

                            <h2 className="text-2xl font-bold text-mine-shaft-950 mb-6">Crea Un Gruppo</h2>

                            <form
                                action=""
                                className="grid grid-cols-1 gap-y-4"
                            >
                                <div className={`${wrapperInputTextStyle}`}>
                                    <label
                                        htmlFor="partenza">Percorso</label>
                                    <input
                                        type="text"
                                        required
                                        name="partenza"
                                        id="form-gruppo-partenza"
                                        className = {`${inputTxtStyle}`}
                                    />
                                </div>
                                <div className={`${wrapperInputTextStyle}`}>
                                    <label htmlFor="data">Data Escursione</label>
                                    <input
                                        type="datetime"
                                        required
                                        name="data"
                                        id="form-gruppo-data"
                                        className = {`${inputTxtStyle}`}
                                    />
                                </div>
                                <div className = {`${wrapperInputTextStyle}`}>
                                    <label htmlFor="descrizione">Descrizione</label>
                                    <textarea name="descrizione" id="" className = {`${inputTxtStyle} resize-none `}></textarea>
                                </div>
                                <div className={`${wrapperInputTextStyle} gap-4`}>
                                    <label htmlFor="esperienza">Livello Esperienza</label>
                                    {['Basso', 'Medio', 'Alto'].map((opt) => (
                                        <label key={opt} className={`cursor-pointer px-4 py-3  flex items-center text-md rounded-lg border  font-semibold transition-colors ${category === opt ? 'bg-mine-shaft-950 text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                                            <input
                                                type="radio"
                                                required
                                                name="esperienza"
                                                className = "hidden"
                                                checked={category === opt}
                                                onChange={() => setCategory(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                                <button
                                    className="w-full mt-12 py-3 px-4 bg-mine-shaft-950 text-white font-medium rounded-lg hover:bg-mine-shaft-800 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
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

