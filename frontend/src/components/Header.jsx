import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

function Header() {
  return (
<div className="flex flex-col lg:flex-row flex-wrap h-[120vh] md:h-[98vh] lg:h-auto bg-primary rounded-lg px-6 md:px-10 lg:px-20">
  {/* left side */}
  <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] m-auto">
    <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
      Book Appointment <br /> With Trusted Doctors
    </p>
    <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
      <img className="w-28" src={assets.group_profiles} alt="" />
      <p className="text-center md:text-left">
        Explore our extensive list of trusted doctors
        <br className="hidden sm:block" /> 
        and effortlessly schedule your appointment without any hassle.
      </p>
    </div>
    <a
      href="#speciality"
      className="flex items-center gap-2 bg-white mx-auto md:mx-0 px-4 py-3 rounded-lg hover:scale-105 transition-all"
    >
      Book Appointment <img className="w-3" src={assets.arrow_icon} alt="" />
    </a>
  </div>

  {/* right side */}
  <div className="md:w-1/2 relative mt-10 md:mt-0">
    <img className="w-full 800-1000:left-[10rem] h-auto absolute bottom-0 rounded-lg" src={assets.header_img} alt="" />
  </div>
</div>

  )
}

export default Header
