import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Groups from './pages/Groups'
import About from "./pages/About.tsx";
import MyHikes from './pages/MyHikes.tsx'
import Profile from './pages/Profile.tsx'

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/my-hikes" element={<MyHikes/>}/>
            <Route path="/profile" element = {<Profile/>}/>
        </Routes>
    </>
  )
}

export default App
