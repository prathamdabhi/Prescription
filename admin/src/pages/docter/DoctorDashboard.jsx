import React, { useContext, useEffect } from 'react'
import { DocterContext } from '../../context/DocterContext'

const DoctorDashboard = () => {
  const {  getDashData,dashData,setDashData,dtoken } = useContext(DocterContext);

  useEffect(() => {
    if(dtoken){
      getDashData();
    }
  }, [dtoken]);
  return dashData && (
    <div>
      DoctorDashboard
    </div>
  )
}

export default DoctorDashboard
