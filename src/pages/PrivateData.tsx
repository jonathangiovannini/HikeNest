import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivateData = () => {
    return(
        <>
            <Navbar/>
            <div className = "w-full   p-8 flex flex-col gap-10">
                <div className = "w-full flex flex-col gap-2">
                    <h1 className = "font-bold text-4xl">Disclaimer: Progetto Universitario</h1>
                    <p className ="text-lg">Questo sito web è stato realizzato esclusivamente a scopo didattico per il corso di Informatica presso l'università di Trento. Non ha alcun fine commerciale o di lucro</p>
                </div>
                <div className = "flex flex-col gap-2">
                    <h2 className = "font-bold text-2xl">Privacy</h2>
                    <p className ="text-lg">Nessun dato personale reale viene raccolto, ceduto a terzi o utilizzato per scopi di marketing. Eventuali dati inseriti verranno utilizzati al solo scopo di testare le funzionalità dell'applicazione e verranno periodicamente cancellati.</p>
                </div>
                <div className = "flex flex-col gap-2">
                    <h2 className = "font-bold text-2xl">Cookies e Local Storage</h2>
                    <p className ="text-lg">Questa applicazione utilizza esclusivamente strumenti tecnici essenziali per il funzionamento del sito (come il salvataggio del token di autenticazione nel Local Storage per mantenere la sessione attiva). Non vengono utilizzati cookie di profilazione o tracciamento.</p>
                </div>
                <div className = "flex flex-col gap-2">
                    <h2 className = "font-bold text-2xl">Termini di Servizio</h2>
                    <p className ="text-lg">L'utilizzo di questa piattaforma è limitato alla valutazione accademica. Il creatore non si assume alcuna responsabilità per la perdita di dati inseriti in questo ambiente di test</p>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default PrivateData;