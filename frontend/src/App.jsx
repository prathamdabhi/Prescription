
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contect from './pages/Contect'
import MyProfile from './pages/MyProfile'
import MyApointment from './pages/MyApointment'
import Apointment from './pages/Apointment'
import Navbar from './components/Navbar'
import Fotter from './components/Fotter'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
     <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors/>} />
            <Route path='/doctors/:speciality' element={<Doctors/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contect/>} />
            <Route path='/my-profile' element={<MyProfile/>} />
            <Route path='/my-apointments' element={<MyApointment/>} />
            <Route path='/apointment/:docid' element={<Apointment/>} />

          </Routes>
          <Fotter />
     </div>
    </>
  )
}

export default App
