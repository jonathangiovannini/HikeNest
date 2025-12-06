import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Dashboard from '../components/Dashboard';

const MyHikes = () => {
    useDocumentTitle("My Hikes - HikeNest");
    return(
        <>
            <Navbar/>
            <Dashboard/>
            <Footer/>
        </>
    );
}

export default MyHikes;