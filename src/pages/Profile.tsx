import Navbar from "../components/Navbar";
import SimpleFooter from "../components/SimpleFooter";
import StatGrid from "../components/StatGrid";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from '../hooks/useDocumentTitle';
import {useState} from 'react';
import FormProfilo from '../components/FormProfilo';


const Profile = () => {
    useDocumentTitle('Profilo - HikeNest');
    const [FormAperta, setForm] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const idUtente = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [userData, setUserData] = useState({
        bio: "",
        nGruppi: 0,
        kmTotali: 0,
        percorsoPreferito: ""
    });
    const fetchProfilo = async () => {
        try {
                const response = await fetch(apiUrl + "/utenti/" + idUtente, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                });

                if(!response.ok){
                    throw new Error("Errore nel caricamento del profilo");
                }
                const data = await response.json();
                setUserData({
                    bio: data.bio,
                    nGruppi: data.nGruppi,
                    kmTotali: data.kmTotali,
                    percorsoPreferito: data.percorsoPreferito
                });
                localStorage.setItem("nGruppi", userData.nGruppi+"");
                localStorage.setItem("kmTotali", userData.kmTotali+"");
                localStorage.setItem("percorsoPreferito", userData.percorsoPreferito);

        }catch (err){};
    }
    if (idUtente) {
        fetchProfilo();
    }
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className='flex flex-col items-center grow py-8'>
                <div className='flex flex-col lg:flex-row w-11/12 lg:w-3/4 justify-between items-center'>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='w-48 h-48 rounded-full overflow-hidden flex items-center justify-center justify-self-start'>
                            <img src="images/user.png" alt="" />
                        </div>
                    </div>
                    <div className='w-11/12 lg:w-3/4 lg:mt-0 mt-8'>
                        <div className='flex flex-col gap-4 justify-center lg:items-start items-center'>
                            <h2 className='font-bold text-3xl'>{username}</h2>
                            <p>{userData.bio}</p>
                        </div>
                    </div>
                </div>
                <button 
                    className='w-48 h-12 font-bold mt-6 hover:underline hover:cursor-pointer'
                    onClick={() => setForm(true)}
                >Modifica Profilo
                </button>
                <FormProfilo
                    isOpen={FormAperta}
                    onClose={() => setForm(false)}
                />
                <div className='w-11/12 lg:w-3/4 mt-8'>
                    <StatGrid/>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-8 px-4 py-2 w-36 h-12 bg-mine-shaft-950 text-white rounded hover:bg-mine-shaft-600 hover:cursor-pointer"
                >
                    Esci
                </button>
            </div>
            <SimpleFooter/>
        </div>
    );
}

export default Profile;