import React, { useRef, useState, useEffect } from "react";
import background from "../../../public/banner/login.jpg";
import { useDispatch } from "react-redux";
import { otpVerify, resendOtp } from "../../features/User/auth/authAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure you import the CSS for toastify


function Otp() {
  const inputs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timer, setTimer] = useState(60); // Set initial time (e.g., 150 seconds or 2 minutes 30 seconds)
  const [otpExpired, setOtpExpired] = useState(false); // To track if OTP is expired

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setOtpExpired(true); // Set OTP as expired when timer reaches 0
    }
  }, [timer]);

  const handleInput = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]$/.test(value)) {
      e.target.value = ""; 
      return;
    }

    if (value.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  async function onSubmit() {
    if (otpExpired) {
      alert("OTP has expired. Please request a new OTP.");
      return;
    }

    let otp = "";
    for (let i = 0; i < inputs.current.length; i++) {
      otp += inputs.current[i].value;
    }

    if (otp.length !== 6) {
      for (let i = 0; i < inputs.current.length; i++) {
        inputs.current[i].style.border = "1px solid red";
      }

      document.getElementById("error").style.display = "block";
    } else {
      console.log("OTP submitted:", otp);

      for (let i = 0; i < inputs.current.length; i++) {
        inputs.current[i].style.border = "";
      }
      document.getElementById("error").style.display = "none";

      const result = await dispatch(otpVerify(otp));

      console.log(result,"rrrrrrrrrrrrrrres");
      

      if (result.message === "Incorrect OTP") {
        for (let i = 0; i < inputs.current.length; i++) {
          inputs.current[i].style.border = "1px solid red";
        }
        document.getElementById("error").style.display = "block";
      } else if(result.message==="OTP verified and registration successful"){
        toast.success('Register Success', { hideProgressBar: true, className: 'custom-toast-success', autoClose: 2000 })
        setTimeout(()=>{

          navigate("/login");
        },2000)
      }else if(result.message==="Otp verified "){
        console.log('forgot pAGE');
        
        toast.success('Otp verified', { hideProgressBar: true, className: 'custom-toast-success', autoClose: 2000 })
        setTimeout(()=>{
          navigate('/forgot')
        },2000)

      }
    }
  }

  const resendOtpa = async() => {
    setTimer(60);
    setOtpExpired(false); 
    inputs.current.forEach(input => (input.value = ""));
    console.log("OTP resent!");
    await dispatch(resendOtp())
  };

  return (
    <main className="flex-grow bg-gray-100">
       <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        className="text-sm font-medium" // Custom class for styling
        style={{ width: "350px", top: "20px", right: "20px" }} // Inline styles
      />
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col md:flex-row bg-black bg-opacity-50 w-full h-full p-6 md:p-20">
          <div className="text-left text-white md:w-1/2 mr-auto my-auto">
            <h1 className="hidden text-2xl md:text-4xl md:flex font-bold mb-4">
              Unlock Your Ideal Stay at Hostel Haven
            </h1>
            <p className="hidden text-sm md:text-lg md:flex">
              Sign in with your phone number and discover unbeatable deals,
              member-only discounts, and perks from our trusted travel partners.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 md:p-10 w-full md:w-2/5 ml-auto my-auto">
            <h2 className="text-2xl font-bold text-btncolor mb-4">
              OTP Verification
            </h2>
            <p className="text-btncolor mb-6">
              We have sent a One-Time Password (OTP) to your email address.
              Please enter the OTP below to verify your account.
            </p>
            <div className="flex justify-between mb-6">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-12 h-12 text-2xl text-center border rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputMode="numeric" 
                  disabled={otpExpired} // Disable input if OTP is expired
                />
              ))}
            </div>
            <div className="text-red-500 text-xm mt-1 hidden" id="error">
              Incorrect Otp
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-btncolor">
                I didn't receive any code.{" "}
                <a href="#" className="text-blue-500" onClick={resendOtpa}>
                  RESEND
                </a>
              </p>
              <span className="text-gray-800">
                {`${Math.floor(timer / 60)
                  .toString()
                  .padStart(1, "0")}:${(timer % 60)
                  .toString()
                  .padStart(1, "0")}`}
              </span>
            </div>
            {otpExpired && (
              <div className="text-red-500 text-sm mb-4">
                OTP has expired. Please request a new OTP.
              </div>
            )}
            <button
              className="w-full bg-btncolor text-white py-2 rounded focus:outline-none hover:bg-gray-700"
              onClick={onSubmit}
              disabled={otpExpired} // Disable button if OTP is expired
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Otp;
