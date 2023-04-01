import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import OtpInput from 'react18-input-otp';
import { authUser } from '../../features/auth/authSlice';
import Spinner from '../../progressbar/Spinner';
import axios from '../../utils/axios.config';

const Otp = () => {
  document.title = 'Verify Your Account';
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(10);
  const {user,token} = useSelector(state => state.auth);
  const dispatch  = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
  
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [seconds,minutes]);
  const resendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('api/resend-otp',{email:user.email},{headers:{ 'Authorization': `Bearer ${token}`}})
    .then(res => {
        if(res.data.status === 200){
            toast.success(res.data.message);
            setLoading(false)
            setMinutes(4);
        }
        toast(res.data.message);
    })
    .catch(err => {
        toast.error(err.response.data.message);
        setLoading(false)
    })
  }


  const handleChange = (userOtp) => {
    setOtp(userOtp);
    setError('');
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setVerifyLoading(true);
    if(!otp ){
        toast.error('Enter Valid OTP');
        return ;
    }
    // verify-otp
    const data = {
        'email' : user.email,
        'verification_code' : otp,
    }
    axios.post('api/verify-otp',data,
    {headers:{ 'Authorization': `Bearer ${token}`}}
    ) 
    .then(res => {
        setError(res.data.message);
        if(res.data.status === 200){
            toast.success(res.data.message);
            dispatch(authUser());
            navigate('/profile');
        }
        
        // toast.error(res.data.message);
        setVerifyLoading(false);
    })
    .catch(err => {
        toast.error(err.response.data.message);
        setVerifyLoading(false);
    })
    setOtp(0);
  }

  
    return (
        <div className="container mx-auto my-10 rounded-2xl	shadow-xl border p-10 w-10/12 mx-auto">
           
            <form onSubmit={handleSubmit} >
            <h4 className='my-6'>Verify Your Account</h4>
            <p className='mb-4'>To confirm The Email Enter 4 Digit OTP Here</p>
            <OtpInput value={otp} 
       inputStyle={{
        border: "1px solid blue",
        borderRadius: "8px",
        width: "54px",
        height: "54px",
        fontSize: "30px",
        color: "#000",
        fontWeight: "400",
        caretColor: "blue",
        marginRight:"4px",
        
      }}
      focusStyle={{
        border: "2px solid black",
        outline: "none"
      }}
     
      onChange={handleChange} 
      numInputs={4} separator={<span ></span>} />
      <p className='text-red-600 mt-4'>{error}</p>
    
          <button 
            type="submit"
            disabled={verifyLoading}
            className="mt-3 px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow hover:bg-indigo-400"
            >
           {verifyLoading &&  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin inline"  fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" ></circle>
              <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
          </svg>}
          
        {verifyLoading ? 'Loading...' : 'Verify Account'}  
        </button>
        </form>

       <div className="countdown-text">
      {seconds > 0 || minutes > 0 ? (
        <p className='my-3'>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p className='mt-3'>Didn't recieve code?</p>
      )}

      {loading ? <div className='flex mt-2'> < Spinner/> </div> :<button
        disabled={seconds > 0 || minutes > 0}
        style={{
          color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "rgb(7, 131, 7)",
        }}
        className="mt-2"
        onClick={resendOTP}
      >
        Resend OTP
      </button>}
    </div>
        </div>
    );
};

export default Otp;