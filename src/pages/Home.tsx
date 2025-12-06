import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import useDocumentTitle from "../hooks/useDocumentTitle.ts";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
    
    useDocumentTitle('Home - HikeNest');


    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 content-center w-full h-dvh overflow-hidden relative">
                <img
                    src="images/Sfondo.jpg"
                    alt="background-hikenest"
                    className="absolute w-full h-full object-cover object-center"
                />
                <div className="relative grid grid-cols-1 ">
                    <div className="justify-self-center text-center animate-slideFadeIn-fast">
                        <p className="text-mine-shaft-950 font-bold text-5xl sm:text-6xl md:text-8xl ">
                            Find Your Hike Mates
                        </p>
                    </div>
                    <div className="justify-self-center sm:h-48 sm:w-48 md:h-72 md:w-72 h-36 w-36 animate-slideFadeIn-slow">
                        <img src="images/Logo.png" alt="" />
                    </div>
                </div>
                <Link to = '/groups' className = 'flex cursor-pointer w-48 h-12 items-center mx-auto rounded-buttons bg-mine-shaft-950 lg:hidden justify-between  relative animate-slideFadeIn-slow transition delay-100 duration-300 ease-in-out hover:translate-y-1'>
                    <p className = 'text-mine-shaft-50 font-bold ml-4'>INIZIA ORA</p>
                    <ArrowForwardIcon className = 'mr-4 text-mine-shaft-50'/>
                </Link>
            </div>
            <Footer />
        </>
    );
}

export default Home;
