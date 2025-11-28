import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

function Home(){
    return(
        <>
            <Navbar />
            <div className = "grid grid-cols-1 content-center bg-sfondo w-full h-[50rem] overflow-hidden relative">
                <img src = "/images/Sfondo.jpg" alt = "background-hikenest" className="absolute w-full h-full object-cover object-center"/>
                <div className="relative grid grid-cols-1">
                    <div className = "justify-self-center text-center">
                        <p className = "text-mine-shaft-950 font-bold text-5xl sm:text-6xl md:text-8xl">Find Your Hike Mates</p>
                    </div>
                    <div className = "justify-self-center sm:h-48 sm:w-48 md:h-72 md:w-72 h-36 w-36">
                        <img src="/images/Logo.png" alt=""/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;