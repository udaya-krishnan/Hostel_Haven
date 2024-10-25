import { useState } from "react";
import React from 'react';
import everyone from '../../../../../public/icons/everyone.jpg';
import adults from '../../../../../public/icons/adults.jpg';
import coed from '../../../../../public/icons/co-ed.jpeg';
import men from '../../../../../public/icons/men.jpeg';
import women from '../../../../../public/icons/women.webp';
import { toast, Toaster } from "sonner";

function Addproperty4({ handleBack, formData, handleForWhomChange }) {
    const [selected, setSelected] = useState(formData.propertyForWhom || null);

    const handleCardClick = (type) => {
        setSelected(type); // Set the selected card type
    };

    const handleNext = () => {
        if (selected) {
            handleForWhomChange(selected);
        } else {
            toast.error("Please select a category");
        }
    };

    const mealTypes = [
        { type: "Everyone", image: everyone, label: "Everyone" },
        { type: "Adults", image: adults, label: "Adults" },
        { type: "Co-ed", image: coed, label: "Co-ed" },
        { type: "Men", image: men, label: "Men" },
        { type: "Women", image: women, label: "Women" },
    ];

    return (
        <div className="flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-md">
                <h1 className="text-4xl text-btncolor font-extrabold text-center">
                    For Whom
                </h1>

                {/* Container for Cards */}
                <div className="flex mt-10 gap-4 flex-wrap justify-center">
                    {mealTypes.map(({ type, image, label }) => (
                        <div
                            key={type}
                            className={`cursor-pointer flex flex-col items-center rounded-xl transition-all duration-300 p-4 m-2 w-full sm:w-48 ${
                                selected === type ? "bg-btncolor" : "bg-orange-200"
                            }`}
                            onClick={() => handleCardClick(type)}
                        >
                            <div className="w-full h-32 flex items-center justify-center rounded-xl overflow-hidden">
                                <img
                                    src={image}
                                    alt={label}
                                    className="w-full h-full object-cover transition-all duration-300"
                                />
                            </div>
                            <span className={`mt-2 text-lg font-semibold ${selected === type ? "text-white" : "text-btncolor"}`}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Button Container */}
                <div className="flex justify-center items-center mt-10 space-x-4 p-4">
                    <button
                        className="px-6 py-2 rounded-lg bg-white border-2 border-btncolor text-btncolor text-sm md:text-base"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg bg-btncolor text-white text-sm md:text-base"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default Addproperty4;