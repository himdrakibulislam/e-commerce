import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios.config';
const ForgotPassword = () => {
    document.title = 'Forgot Password';
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('forgot-password',{email})
        .then(res =>{
            toast.success(res.data.status,{duration: 8000});
            setLoading(false);
            setError(false);
            navigate('/');
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.response.data.message);
            setError(true);
          })
    }
    return (
        <div className="container mx-auto my-10 rounded-2xl	shadow-xl border p-10">
            <form onSubmit={handleSubmit} className="w-full mx-auto my-10 lg:w-6/12">
            <input type="email"
                      onChange={(e)=> setEmail(e.target.value)}
                      name="email" id="email" placeholder="Enter Your E-mail"
                      className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border border-sky-500 ${error ? 'border-red-500':null}`}
                      required/>

                        <button 
            
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow hover:bg-indigo-400"
            >
           {loading &&  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin inline"  fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" ></circle>
              <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
          </svg>}
          
        {loading ? 'Sending...' : 'Send Reset-Password Link'}  
        </button>

            </form>
        </div>
    );
};

export default ForgotPassword;