import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import MapIcon from '@mui/icons-material/Map';
import GroupIcon from '@mui/icons-material/Group';
import HikingIcon from '@mui/icons-material/Hiking';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Navbar = () => {
    const btnStyleDesk = "font-bold text-md text-center w-32 h-12 rounded-(--radius-buttons) flex items-center justify-center " +
        "transition delay-100 duration-300 ease-in-out hover:translate-y-1";
    const btnStyleMob = "font-bold text-md text-center w-32 h-12 rounded-(--radius-buttons) flex items-center justify-center";
    const linkStyle = "p-4 w-auto relative lg:w-32 flex items-center justify-center transition-all duration-300";

    const user = useAuth();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="grid grid-cols-2 lg:grid-cols-3 content-center w-full bg-mine-shaft-50  h-24 relative ">
            <div className="w-24 h-24 p-4 flex justify-center items-center justify-self-start ml-4">
                <Link to="/">
                    <img src="/Logo.png" alt="logo-hikenest" />
                </Link>
            </div>
            <div className="hidden lg:flex items-center justify-self-center w-full justify-center">
                <div className="flex justify-between items-center w-full max-w-lg lg:max-w-2xl xl:max-w-4xl transition-all gap-8 lg:gap-0 duration-300">
                    <Link to="/map" className={`${linkStyle} navbar-item`}>Map</Link>
                    <Link to="/groups" className={`${linkStyle} navbar-item`}>Groups</Link>
                    <Link to="/my-hikes" className={`${linkStyle} navbar-item`}>My Hikes</Link>
                    <Link to="/about" className={`${linkStyle} navbar-item`}>About Us</Link>
                </div>
            </div>
            {user != null? (
                <div className = 'hidden lg:flex items-center justify-self-end mr-4'>
                    <Link to = "/profile" className = 'rounded-full h-18 w-18  overflow-hidden'>
                        <img src="/user.png" alt="" className = 'object-cover'/>
                    </Link>
                </div>
            ) : (
                <div className="hidden lg:flex items-center gap-2 justify-self-end mr-4">
                    <Link to="/login" className={`${btnStyleDesk} border-mine-shaft-950 border`}>LOGIN</Link>
                    <Link to="/signup" className={`${btnStyleDesk} bg-mine-shaft-950 text-mine-shaft-50`}>SIGN UP</Link>
                </div>
            )}
            
            <div className={`lg:hidden justify-self-end w-24 h-24 flex items-center justify-center`}>
                <IconButton size={"large"} edge="start" aria-label={"menu"} color="inherit" onClick={toggleMenu}>
                    <MenuIcon fontSize="large"></MenuIcon>
                </IconButton>
            </div>
            <div
                className={`fixed inset-0 bg-black/50 z-1100 lg:hidden transition-opacity duration-300  ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            />
            <div className={`fixed top-0 right-0 w-80 h-dvh transform-gpu bg-mine-shaft-50 flex flex-col items-center py-4 lg:hidden z-1200 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="w-full flex justify-end pr-4 mb-4">
                    <IconButton onClick={toggleMenu} aria-label="close menu">
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </div>
                <div className="w-3/4 flex flex-col text-mine-shaft-950">
                    <Link to="/map" className={`${linkStyle} grid grid-cols-2 text-lg md:text-xl p-4`}>
                        <MapIcon fontSize={"medium"} color={"inherit"}></MapIcon><p className="justify-self-end">Map</p>
                    </Link>
                    <Link to="/groups" className={`${linkStyle} border-t grid grid-cols-2 text-lg md:text-xl p-4`}>
                        <GroupIcon fontSize={"medium"} color={"inherit"}></GroupIcon><p className="justify-self-end">Groups</p>
                    </Link>
                    <Link to="/my-hikes" className={`${linkStyle} border-t grid grid-cols-2 text-lg md:text-xl p-4`}>
                        <HikingIcon fontSize={"medium"} color={"inherit"}></HikingIcon><p className="justify-self-end">My Hikes</p>
                    </Link>
                    <Link to="/about" className={`${linkStyle} border-t grid grid-cols-2 text-lg md:text-xl p-4`}>
                        <InfoIcon fontSize={"medium"} color={"inherit"}></InfoIcon> <p className="justify-self-end">About Us</p>
                    </Link>
                </div>
                {user != null ? (
                    <div className = 'flex items-center mt-auto mb-8'>
                        <Link to = "/profile" className = 'rounded-full h-32 w-32 border border-mine-shaft-950 overflow-hidden flex items-center justify-center'>
                            <img src="/user.png" alt="" className = 'object-cover'/>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 mt-auto mb-8">
                        <button className = 'mb-8 text-lg text-mine-shaft-600 decoration underline'>Invia una Segnalazione</button>
                        <Link to="/login" className={`${btnStyleMob} border-mine-shaft-950 border w-56 `}>LOGIN</Link>
                        <Link to="/signup" className={`${btnStyleMob} bg-mine-shaft-950 text-mine-shaft-50 w-56 `}>SIGN UP</Link>
                    </div>
                )}
                
            </div>
        </nav>
    )
}

export default Navbar;