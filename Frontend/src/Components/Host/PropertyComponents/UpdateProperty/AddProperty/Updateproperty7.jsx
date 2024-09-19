import { useEffect, useState } from "react";
import React from 'react'
import {useDispatch} from 'react-redux'
import {fetchsafety}from '../../../../../features/Host/auth/authAction'
import { Toaster,toast } from "sonner";


function Updateproperty7({ updateBack,formData ,updateSafety}) {
    const dispatch=useDispatch()
    const [safetyList,setSafaty]=useState([])
    

      useEffect(()=>{
        const fetchData=async()=>{
            const data=await dispatch(fetchsafety())
            console.log(data.allsafety)
            setSafaty(data.allsafety)
        }
        fetchData()
      },[])
    
      const [selectedSafety, setSelectedSafety] = useState(formData.propertySafety||[]);
    
      // Function to toggle amenity selection
      const toggleSafety = (safety) => {
        if (selectedSafety.some((selected) => selected === safety)) {
          // If the amenity is already selected, remove it
          setSelectedSafety((prevState) =>
            prevState.filter((selected) => selected !== safety)
          );
        } else {
        
          setSelectedSafety((prevState) => [...prevState, safety]);
        }
      };

      const handleNext=()=>{
        if(selectedSafety.length>0){
          updateSafety(selectedSafety)
        }else{
          toast.error('select safety')
        }
      }
    
      return (
        <div className="flex flex-col justify-center items-center p-8 bg-gray-50 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Add Safety available at your place.
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {safetyList.map((safety) => (
          <button
            key={safety._id}
            className={`w-40 h-20 flex items-center justify-center rounded-lg ${
                selectedSafety.some(
                (selected) => selected === safety.name
              )
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-gray-600"
            } hover:bg-gray-200`}
            onClick={() => toggleSafety(safety.name)}
          >
            {safety.name}
          </button>
        ))}
      </div>
    
          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <button
              className="px-8 py-2 border-2 border-btncolor text-btncolor rounded-lg"
              onClick={updateBack}
            >
              Back
            </button>
            <button
              className="px-8 py-2 bg-btncolor text-white rounded-lg"
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
          <Toaster position="top-right" />
        </div>
      );
    }

export default Updateproperty7
