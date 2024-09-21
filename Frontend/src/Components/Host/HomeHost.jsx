import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import hostbanner from '../../../public/banner/hostbanner.jpg'
import { useSelector } from 'react-redux'
import { selectHost } from '../../features/Host/auth/authSelectors'
function HomeHost() {

  const hostData=useSelector(selectHost)

  useEffect(()=>{
    console.log(hostData,"host in hoem");
    
  },[hostData])
  
  return (
    
      <section
        className="relative flex-grow bg-cover bg-center"
        style={{
          backgroundImage: `url(${hostbanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Try Hosting With Us
          </h2>
          <p className="text-lg md:text-xl mb-6">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis 
          </p>
          <button className="bg-[#444444] hover:bg-gray-700 text-white py-3 px-8 rounded-full font-semibold">
            Lets Get Started
          </button>
        </div>
      </section>
   
  )
}

export default HomeHost
