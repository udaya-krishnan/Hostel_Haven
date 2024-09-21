import React,{useState} from 'react'
import { Toaster,toast } from 'sonner';

function Updateproperty5({formData, updateBack,updatepropertyFacilities }) {
  // Initial state for the number of bedrooms, bathrooms, and parking
  const [facilities, setFacilities] = useState(formData.propertyFacilities);

  // Function to handle increment and decrement actions
  const handleIncrement = (type) => {
    setFacilities((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    setFacilities((prevState) => ({
      ...prevState,
      [type]: prevState[type] > 0 ? prevState[type] - 1 : 0,
    }));
  };

  const handleNext=()=>{
    if(facilities.bedroom>0||facilities.bathroom>0||facilities.parking>0){
      updatepropertyFacilities(facilities)
    }else{
      toast.error("add facilites")
    }
  }

  console.log(facilities);
  

  return (
    <div className="flex flex-col justify-center items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add facilities available at your place.
      </h1>
      <div className="flex space-x-6 mb-8">
        {/* Bedrooms */}
        <div className="flex items-center space-x-4">
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleDecrement("bedroom")}
          >
            -
          </button>
          <span className="text-xl font-semibold">{facilities.bedroom}</span>
          <span className="text-gray-600">Bedrooms</span>
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleIncrement("bedroom")}
          >
            +
          </button>
        </div>

        {/* Bathrooms */}
        <div className="flex items-center space-x-4">
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleDecrement("bathroom")}
          >
            -
          </button>
          <span className="text-xl font-semibold">{facilities.bathroom}</span>
          <span className="text-gray-600">Bathrooms</span>
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleIncrement("bathroom")}
          >
            +
          </button>
        </div>

        {/* Parking */}
        <div className="flex items-center space-x-4">
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleDecrement("parking")}
          >
            -
          </button>
          <span className="text-xl font-semibold">{facilities.parking}</span>
          <span className="text-gray-600">Parking</span>
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleIncrement("parking")}
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
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

export default Updateproperty5
