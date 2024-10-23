
import { useContext } from 'react';
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashbord from './pages/admin/Dashbord';
import AllAppointment from './pages/admin/AllAppointment';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import { DocterContext } from './context/DocterContext';
import DoctorDashboard from './pages/docter/DoctorDashboard';
import DoctorAppointment from './pages/docter/DoctorAppointment';
import DoctorProfile from './pages/docter/DoctorProfile';

function App() {

  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DocterContext);
  return atoken || dtoken ? (
    <>
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashbord' element={<Dashbord/>}/>
          <Route path='/all-appointments' element={<AllAppointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>

          {/* DOCTOR ROUTES */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointment/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>

        </Routes>
        </div>
      </div>
    </>
  ) : (
    <>
     <Login />
     <ToastContainer />
    </>
  )
}

export default App
