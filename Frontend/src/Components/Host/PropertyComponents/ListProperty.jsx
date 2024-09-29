import React, { useState, useEffect } from "react";
import { selectHost } from "../../../features/Host/auth/authSelectors";
import Addproperty1 from "./AddProperty/Addproperty1";
import AddProperty2 from "./AddProperty/AddProperty2";
import Addproperty3 from "./AddProperty/Addproperty3";
import Addproperty4 from "./AddProperty/Addproperty4";
import Addproperty5 from "./AddProperty/Addproperty5";
import Addproperty6 from "./AddProperty/Addproperty6";
import Addproperty7 from "./AddProperty/Addproperty7";
import Addproperty8 from "./AddProperty/Addproperty8";
import Addproperty9 from "./AddProperty/Addproperty9";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { addproperty, updateProperty } from "../../../features/Host/auth/authAction";
import CardProperty from "./CardProperty";
import Updateproperty1 from "./UpdateProperty/AddProperty/Updateproperty1";
import UpdateProperty2 from "./UpdateProperty/AddProperty/UpdateProperty2";
import Updateproperty3 from "./UpdateProperty/AddProperty/Updateproperty3";
import Updateproperty4 from "./UpdateProperty/AddProperty/Updateproperty4";
import Updateproperty5 from "./UpdateProperty/AddProperty/Updateproperty5";
import Updateproperty6 from "./UpdateProperty/AddProperty/Updateproperty6";
import Updateproperty7 from "./UpdateProperty/AddProperty/Updateproperty7";
import Updateproperty8 from "./UpdateProperty/AddProperty/Updateproperty8";
import Updateproperty9 from "./UpdateProperty/AddProperty/Updateproperty9";

function ListProperty() {
  const [currentStep, setCurrentStep] = useState(0);
  const [updateStep, setUpdateStep] = useState(0);
  const hostData = useSelector(selectHost);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    propertyId:"",
    propertyName: "",
    propertyLocation: "",
    propertyLatitude: "",
    propertyLongitude: "",
    propertyDescription: "",
    propertyLicense: "",
    propertyCertificate: null,
    propertyImages: [],
    propertyPrice: "",
    propertyOffer: "",
    propertyType: "",
    propertyAccommodation: "",
    propertyForWhom: "",
    propertyFacilities: {
      rooms: 0,
      bathrooms: 0,
      parking: 0,
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
  const updateNext = () => setUpdateStep(updateStep + 1);
  const updateBack = () => setUpdateStep(updateStep - 1);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePropertyTypeChange = (type) => {
    setFormData({ ...formData, propertyType: type });
    handleNext();
  };

  const UpdatePropertyTypeChange = (type) => {
    setFormData({ ...formData, propertyType: type });
    updateNext();
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, propertyCertificate: e.target.files[0] });
  };

  const updateFileChange = (e) => {
    setFormData({ ...formData, propertyCertificate: e.target.files[0] });
  };

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, propertyImages: files }));
  };
  const updateImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, propertyImages: files }));
    console.log(formData.propertyImages);
    
  };

  const handleAccommodationChange = (accommodation) => {
    setFormData({ ...formData, propertyAccommodation: accommodation });
    handleNext();
  };

  const updateAccommodationChange = (accommodation) => {
    setFormData({ ...formData, propertyAccommodation: accommodation });
    updateNext();
  };

  const handleForWhomChange = (forwhom) => {
    setFormData({ ...formData, propertyForWhom: forwhom });
    handleNext();
  };
  const updateForWhomChange = (forwhom) => {
    setFormData({ ...formData, propertyForWhom: forwhom });
    updateNext();
  };

  const handleAmenities = (amenities) => {
    setFormData({ ...formData, propertyAmenities: amenities });
    handleNext();
  };

  const updateAmenities = (amenities) => {
    setFormData({ ...formData, propertyAmenities: amenities });
    updateNext();
  };



  const handleSafety = (safety) => {
    setFormData({ ...formData, propertySafety: safety });
    handleNext();
  };

  const updateSafety = (safety) => {
    setFormData({ ...formData, propertySafety: safety });
    updateNext();
  };

  const propertyFacilities = (facilities) => {
    setFormData({ ...formData, propertyFacilities: facilities });
    handleNext();
  };

  const updatepropertyFacilities = (facilities) => {
    setFormData({ ...formData, propertyFacilities: facilities });
    updateNext();
  };

  const propertyPolicies = (policies) => {
    setFormData({ ...formData, propertyPolicies: policies });
    handleNext();
  };

  const updatepropertyPolicies = (policies) => {
    setFormData({ ...formData, propertyPolicies: policies });
    updateNext();
  };

  const handleLocationChange = ({ latitude, longitude, name }) => {
    setFormData({
      ...formData,
      propertyLatitude: latitude,
      propertyLongitude: longitude,
      propertyLocation: name,
    });
  };

  const updateLocationChange = ({ latitude, longitude, name }) => {
    setFormData({
      ...formData,
      propertyLatitude: latitude,
      propertyLongitude: longitude,
      propertyLocation: name,
    });
  };

  const updateSubmit = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("propertyName", formData.propertyName);
    formDataToSend.append("propertyLocation", formData.propertyLocation);
    formDataToSend.append("propertyLatitude", formData.propertyLatitude);
    formDataToSend.append("propertyLongitude", formData.propertyLongitude);
    formDataToSend.append("propertyDescription", formData.propertyDescription);
    formDataToSend.append("propertyPrice", formData.propertyPrice);
    formDataToSend.append("propertyOffer", formData.propertyOffer);
    formDataToSend.append("propertyType", formData.propertyType);
    formDataToSend.append(
      "propertyAccommodation",
      formData.propertyAccommodation
    );
    formDataToSend.append("propertyForWhom", formData.propertyForWhom);
    formDataToSend.append(
      "propertyFacilities",
      JSON.stringify(formData.propertyFacilities)
    );
    formDataToSend.append(
      "propertyAmenities",
      JSON.stringify(formData.propertyAmenities)
    );
    formDataToSend.append(
      "propertySafety",
      JSON.stringify(formData.propertySafety)
    );
    formDataToSend.append(
      "propertyPolicies",
      JSON.stringify(formData.propertyPolicies)
    );
    formDataToSend.append("hostId", hostData.email);

    console.log(formData.propertyImages,'property image');
    

    if (formData.propertyImages.length > 0) {
      formData.propertyImages.forEach((image) => {
        console.log(image,"images");
        
        formDataToSend.append("propertyImages", image);
      });
    }

    formDataToSend.append("id",formData.propertyId)

    try {
      console.log(formDataToSend,"to send");
      
      toast.promise(
        new Promise((resolve, reject) => {
          dispatch(updateProperty(formDataToSend))
            .then(() => {
              resolve();
              setUpdateStep(0);
            })
            .catch(() => {
              reject();
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
        {
          loading: "Property Updating...",
          success: "Property Updated successfully!",
          error: "Failed to Add property. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("propertyName", formData.propertyName);
    formDataToSend.append("propertyLocation", formData.propertyLocation);
    formDataToSend.append("propertyLatitude", formData.propertyLatitude);
    formDataToSend.append("propertyLongitude", formData.propertyLongitude);
    formDataToSend.append("propertyDescription", formData.propertyDescription);
    formDataToSend.append("propertyLicense", formData.propertyLicense);
    formDataToSend.append("propertyPrice", formData.propertyPrice);
    formDataToSend.append("propertyOffer", formData.propertyOffer);
    formDataToSend.append("propertyType", formData.propertyType);
    formDataToSend.append(
      "propertyAccommodation",
      formData.propertyAccommodation
    );
    formDataToSend.append("propertyForWhom", formData.propertyForWhom);
    formDataToSend.append(
      "propertyFacilities",
      JSON.stringify(formData.propertyFacilities)
    );
    formDataToSend.append(
      "propertyAmenities",
      JSON.stringify(formData.propertyAmenities)
    );
    formDataToSend.append(
      "propertySafety",
      JSON.stringify(formData.propertySafety)
    );
    formDataToSend.append(
      "propertyPolicies",
      JSON.stringify(formData.propertyPolicies)
    );
    formDataToSend.append("hostId", hostData.email);

    if (formData.propertyCertificate) {
      formDataToSend.append(
        "propertyCertificate",
        formData.propertyCertificate
      );
    }

    if (formData.propertyImages.length > 0) {
      formData.propertyImages.forEach((image) => {
        formDataToSend.append("propertyImages", image);
      });
    }

    console.log(formDataToSend,'form data to send');
    

    try {
      toast.promise(
        new Promise((resolve, reject) => {
          dispatch(addproperty(formDataToSend))
            .then(() => {
              resolve();
              setCurrentStep(0);
            })
            .catch(() => {
              reject();
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
        {
          loading: "Property Adding...",
          success: "Property Added successfully!",
          error: "Failed to Add property. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  return (
    <>
      {(currentStep === 0 && updateStep===0)&& (
        <>
          <div className="flex flex-col items-center justify-center mt-24">
            <div className="flex justify-between w-10/12 mb-8">
              <h1 className="text-2xl text-btncolor font-extrabold underline">
                Listed Properties
              </h1>
              <button
                className="px-8 py-2 rounded-lg bg-btncolor text-white hover:bg-btncolor-dark"
                onClick={handleNext}
              >
                Add property
              </button>
            </div>
          </div>
          <CardProperty setFormData={setFormData} updateNext={updateNext} />
        </>
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
        <>
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
          <Toaster />
        </>
      )}
      {updateStep === 1 && (
        <Updateproperty1
          formData={formData}
          updateChange={updateChange}
          updateBack={updateBack}
          updateNext={updateNext}
          UpdatePropertyTypeChange={UpdatePropertyTypeChange}
        />
      )}
      {updateStep === 2 && (
        <UpdateProperty2
          formData={formData}
          updateChange={updateChange}
          updateBack={updateBack}
          updateNext={updateNext}
        />
      )}
      {updateStep === 3 && (
        <Updateproperty3
        formData={formData}
        updateBack={updateBack}
        updateNext={updateNext}
        updateAccommodationChange={updateAccommodationChange}
        />
      )}
      {updateStep === 4 && (
        <Updateproperty4
        formData={formData}
        updateChange={updateChange}
        updateBack={updateBack}
        updateNext={updateNext}
        updateForWhomChange={updateForWhomChange}
        />
      )}
      {updateStep === 5 && (
        <Updateproperty5
        formData={formData}
        updateChange={updateChange}
        updateBack={updateBack}
        updateNext={updateNext}
        updatepropertyFacilities={updatepropertyFacilities}
        />
      )}
      {updateStep === 6 && (
        <Updateproperty6
        formData={formData}
        updateChange={updateChange}
        updateBack={updateBack}
        updateNext={updateNext}
        updateAmenities={updateAmenities}
        />
      )}
      {updateStep === 7 && (
        <Updateproperty7
          formData={formData}
          updateChange={updateChange}
          updateBack={updateBack}
          updateNext={updateNext}
          updateSafety={updateSafety}
        />
      )}
      {updateStep === 8 && (
        <Updateproperty8
          formData={formData}
          updateChange={updateChange}
          updateBack={updateBack}
          updateNext={updateNext}
          updatepropertyPolicies={updatepropertyPolicies}
        />
      )}
      {updateStep === 9 && (
        <Updateproperty9
        formData={formData}
        updateChange={updateChange}
        updateFileChange={updateFileChange}
        updateBack={updateBack}
        updateNext={updateNext}
        updateImageFileChange={updateImageFileChange}
        updateLocationChange={updateLocationChange}
        updateSubmit={updateSubmit}
        />
      )}
    </>
  );
}

export default ListProperty;
