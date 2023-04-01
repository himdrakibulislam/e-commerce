import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from '../../utils/axios.config';
const UpdatePassword = () => {
    document.title = 'Reset Password';
    const {token} = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const navigate  = useNavigate();
    const [data,setData] = useState({});
    const [passwordType, setPasswordType] = useState('password');
    const [loading,setLoading] = useState(false);
    const handleChange =({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const newData = {...data,token,email}
        axios.post('reset-password',newData)
        .then(res =>{
            toast.success(res.data.status);
            setLoading(false)
            navigate('/login');
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.response.data.message);
        })
    }
    return (
        <div className="container mx-auto my-10 rounded-2xl	shadow-xl border p-10">
              <form onSubmit={handleSubmit} className="w-6/12 mx-auto my-10">
            <input type={passwordType}
                      onChange={handleChange}
                      name="password" id="newpassword" placeholder="New Password"
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border border-sky-500"
                      required/>


            <input type={passwordType}
                      onChange={handleChange}
                      name="password_confirmation" id="confirmpassword" placeholder="Confirm Password"
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border border-sky-500"
                      required/>
                       <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mb-3">
         <input  id="bordered-checkbox-2"
        type="checkbox" 
        onClick={(e) => setPasswordType(e.target.checked ?'text':'password')}
        name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
         <label  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">Show Password</label>
            </div>

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
          
        {loading ? 'Loading...' : 'Change Password'}  
        </button>
                        
            </form>
        </div>
    );
};

export default UpdatePassword;