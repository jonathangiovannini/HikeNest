import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Footer from "./components/Footer.tsx";
import About from "./pages/About.tsx";

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
