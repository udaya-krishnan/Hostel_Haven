// src/Addproperty8.jsx

import React, { useState } from 'react';

function Addproperty8({ formData, propertyPolicies, handleBack }) {
  const [policy, setPolicy] = useState('');
  const [policies, setPolicies] = useState(formData.propertyPolices || []);

  const addPolicy = () => {
    if (policy.trim() !== '' && !policies.includes(policy)) {
      setPolicies([...policies, policy]);
      setPolicy('');
    }
  };


  const removePolicy = (index) => {
    const updatedPolicies = [...policies];
    updatedPolicies.splice(index, 1);
    setPolicies(updatedPolicies);
  };

  const handleNext = () => {
    if (policies.length > 0) {
        console.log(policies);
        propertyPolicies(policies);
    } else {
      alert('Please add at least one policy.');
    }
  };

  return (
    <div className="flex flex-row justify-between  mx-20 my-10 p-8 bg-white">
        <div className='flex-col'>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add Policies Available at Your Place
      </h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded-l-md px-4 py-2 w-full"
          placeholder="Enter policy"
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
        />
        <button
          onClick={addPolicy}
          className="bg-btncolor text-white px-4 py-2 rounded-r-md"
        >
          Add
        </button>
      </div>

      </div>

      <div>

      <div className="">
        <h2 className="text-xl font-semibold mb-2">Added Policies</h2>
        <hr className="mb-4" />
        <ul className="list-none space-y-2">
          {policies.map((policy, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-2 shadow-sm rounded">
              <span>{policy}</span>
              <button
                onClick={() => removePolicy(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex space-x-4 mt-6">
        <button
          className="px-8 py-2 border-2 border-btncolor text-btncolor rounded-lg"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="px-8 py-2 bg-btncolor text-white rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      </div>
      
      

        
     
    </div>
  );
}

export default Addproperty8;
