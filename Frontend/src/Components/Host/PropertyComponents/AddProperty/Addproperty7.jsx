import { useEffect, useState } from "react";
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSafety } from '../../../../features/Host/auth/authAction';
import { Toaster, toast } from "sonner";

function Addproperty7({ handleBack, formData, handleSafety }) {
    const dispatch = useDispatch();
    const [safetyList, setSafety] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(fetchSafety());
            setSafety(data.payload.allsafety); // Assume data.payload.allsafety returns an array of safety items
        };
        fetchData();
    }, [dispatch]);

    const [selectedSafety, setSelectedSafety] = useState(formData.propertySafety || []);

    // Function to toggle safety selection
    const toggleSafety = (safety) => {
        if (selectedSafety.some((selected) => selected === safety)) {
            // If the safety item is already selected, remove it
            setSelectedSafety((prevState) =>
                prevState.filter((selected) => selected !== safety)
            );
        } else {
            // If the safety item is not selected, add it
            setSelectedSafety((prevState) => [...prevState, safety]);
        }
    };

    const handleNext = () => {
        if (selectedSafety.length > 0) {
            handleSafety(selectedSafety);
        } else {
            toast.error('Please select at least one safety option.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-4 sm:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Add Safety available at your place.
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {safetyList.map((safety) => (
                    <button
                        key={safety._id}
                        className={`w-full h-20 flex items-center justify-center rounded-lg ${
                            selectedSafety.some((selected) => selected === safety.name)
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
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    className="px-8 py-2 border-2 border-btncolor text-btncolor rounded-lg w-full sm:w-auto"
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    className="px-8 py-2 bg-btncolor text-white rounded-lg w-full sm:w-auto"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default Addproperty7;