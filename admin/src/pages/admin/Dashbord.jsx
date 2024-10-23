import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Dashbord = () => {
  const { atoken, getDashData, cancelAppointment, dashData} = useContext(AdminContext);
  useEffect(() => {
    if(atoken){
      getDashData()
    }
  }, [atoken]); 
  return (
    <div>
      
    </div>
  )
}

export default Dashbord
