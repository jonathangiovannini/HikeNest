import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Section from "../components/Section.tsx";
import FormGruppo from "../components/FormGruppo.tsx";
import {useState} from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import Separator from "../components/Separator.tsx";


function Groups() {

    const [FormAperta, setForm] = useState(false);

    return (
        <>
            <Navbar />
            <Section>
                <h1 className="justify-self-center text-mine-shaft-950 text-6xl lg:text-8xl p-12 font-bold text-shadow-sm text-shadow-mine-shaft-50">
                    Trova la tua comunità
                </h1>
                <p className="justify-self-center p-8 text-mine-shaft-950 text-xl">
                    Entra in contatto con altri escursionisti, unisciti ad avventure di
                    gruppo e scopri nuovi sentieri insieme. La montagna chiama, e tu non
                    se solo
                </p>
            </Section>
            <div className="w-full flex justify-center ">
                <button 
                    className="text-mine-shaft-50 font-bold bg-mine-shaft-950 w-48 h-16 rounded-buttons cursor-pointer transition delay-100 duration-300 ease-in-out hover:translate-y-1"
                    onClick={() => setForm(true)}
                >
                    CREA UN GRUPPO
                </button>
            </div>
            <FormGruppo 
                isOpen={FormAperta} 
                onClose={() => setForm(false)} 
            />
            <Separator/>   
            <div className = "w-11/12  h-16 md:h-20 lg:h-24  mt-8  bg-gray-50 rounded-lg mx-auto shadow-xl flex justify-between items-center">

                <input
                    type="text"
                    className = 'h-10 lg:h-12 w-7/12 pl-2 ml-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-mine-shaft-950 focus:border-transparent transition-all'
                    placeholder = "Cerca"

                />
                
                <div className = 'hidden lg:flex gap-8 ml-4 mr-4'>
                    <div>
                        <label htmlFor="difficolta">Difficoltà: </label>
                        <select name="difficolta" id="">
                            <option value="facile">Facile</option>
                            <option value="medio">Medio</option>
                            <option value="difficile">Difficile</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="lunghezza">Lunghezza: </label>
                        <select name="lunghezza" id="">
                            <option value="corto">1km - 5km</option>
                            <option value="medio">5km - 10km</option>
                            <option value="lungo">10km +</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="valutazioni">Valutazioni: </label>
                        <select name="valutazioni" id="">
                            <option value="scarsa">Scarsa</option>
                            <option value="buona">Buona</option>
                            <option value="ottima">Ottima</option>
                        </select>
                    </div>
                </div>
                <div className={`lg:hidden w-16 h-16 flex items-center justify-center `}>
                    <IconButton size={"large"} edge="start" aria-label={"menu"} color="inherit" >
                        <FilterAltIcon fontSize="large"></FilterAltIcon>
                    </IconButton>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Groups;
