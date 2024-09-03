import React, { useState, useEffect } from "react";
import Addproperty1 from "./AddProperty/Addproperty1";
import AddProperty2 from "./AddProperty/AddProperty2";
import Addproperty3 from "./AddProperty/Addproperty3";
import Addproperty4 from "./AddProperty/Addproperty4";
import Addproperty5 from "./AddProperty/Addproperty5";
import Addproperty6 from "./AddProperty/Addproperty6";
import Addproperty7 from "./AddProperty/Addproperty7";
import Addproperty8 from "./AddProperty/Addproperty8";
import Addproperty9 from "./AddProperty/Addproperty9";

function ListProperty() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyLocation: "",
    propertyLatitude: "",
    propertyLongitude: "",
    propertyDescription: "",
    propertyLicense: "",
    propertyCertificate: null,
    propertyImages: [], // Change to an array
    propertyPrice: "",
    propertyOffer: "",
    propertyType: "",
    propertyAccommodation: "",
    propertyForWhom: "",
    propertyFacilities: {
      rooms: 0,
      bathrooms: 0,
      parking: 0
    },
    propertyAmenities: null,
    propertySafety: null,
    propertyPolicies: null,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePropertyTypeChange = (type) => {
    setFormData({ ...formData, propertyType: type });
    handleNext();
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, propertyCertificate: e.target.files[0] });
  };

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, propertyImages: files }));
  };

  const handleAccommodationChange = (accommodation) => {
    setFormData({ ...formData, propertyAccommodation: accommodation });
    handleNext();
  };

  const handleForWhomChange = (forwhom) => {
    setFormData({ ...formData, propertyForWhom: forwhom });
    handleNext();
  };

  const handleAmenities = (amenities) => {
    setFormData({ ...formData, propertyAmenities: amenities });
    handleNext();
  };

  const handleSafety = (safety) => {
    setFormData({ ...formData, propertySafety: safety });
    handleNext();
  };

  const propertyFacilities = (facilities) => {
    setFormData({ ...formData, propertyFacilities: facilities });
    handleNext();
  };

  const propertyPolicies = (policies) => {
    setFormData({ ...formData, propertyPolicies: policies });
    handleNext();
  };

  const handleLocationChange = ({ latitude, longitude, name }) => {
    setFormData({
      ...formData,
      propertyLatitude: latitude,
      propertyLongitude: longitude,
      propertyLocation: name,
    });
  };

  const handleSubmit = () => {
    console.log("Property Information:", formData);
    // Optionally, send the formData to your backend server here
  };

  return (
    <>
      {currentStep === 0 && (
        <div className="flex justify-center">
          <div className="flex justify-between w-10/12 mt-24">
            <h1 className="text-2xl text-btncolor font-extrabold underline-offset-2 underline">
              Listed Properties
            </h1>
            <button className="px-8 py-2 rounded-lg bg-btncolor text-white" onClick={handleNext}>
              Add property
            </button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <Addproperty1
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handlePropertyTypeChange={handlePropertyTypeChange}
        />
      )}
      {currentStep === 2 && (
        <AddProperty2
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {currentStep === 3 && (
        <Addproperty3
          formData={formData}
          handleBack={handleBack}
          handleNext={handleNext}
          handleAccommodationChange={handleAccommodationChange}
        />
      )}
      {currentStep === 4 && (
        <Addproperty4
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handleNext={handleNext}
          handleForWhomChange={handleForWhomChange}
        />
      )}
      {currentStep === 5 && (
        <Addproperty5
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handleNext={handleNext}
          propertyFacilities={propertyFacilities}
        />
      )}
      {currentStep === 6 && (
        <Addproperty6
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handleNext={handleNext}
          handleAmenities={handleAmenities}
        />
      )}
      {currentStep === 7 && (
        <Addproperty7
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSafety={handleSafety}
        />
      )}
      {currentStep === 8 && (
        <Addproperty8
          formData={formData}
          handleChange={handleChange}
          handleBack={handleBack}
          handleNext={handleNext}
          propertyPolicies={propertyPolicies}
        />
      )}
      {currentStep === 9 && (
        <Addproperty9
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleBack={handleBack}
          handleNext={handleNext}
          handleImageFileChange={handleImageFileChange}
          handleLocationChange={handleLocationChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default ListProperty;
