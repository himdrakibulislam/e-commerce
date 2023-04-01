import axios from '../../utils/axios.config';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../progressbar/Spinner';

const Register = () => {
    document.title = 'Registration';
    const [data,setData] = useState({
        email:"",
        password:""
    });
    const [errEmail,setEmailErr] = useState();
    const [errPass,setErrPassword] = useState();
    const [errMessage,setErrMessage] = useState();
    const [loading,setloading] = useState(false);

 
    const handleChange =({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value})
    }
    const formData = async(e) => {
        e.preventDefault();
        setloading(true);
        axios.post('register',data)
        .then(res => {
            Cookies.set('authCookie',res.data.token, { expires: 3 });
            
            setloading(false);
            window.location.href = '/verify-otp';

           })
        .catch(err => {
            const error = err.response.data;
            if(error.errors.email){
                setEmailErr(error.errors.email.toString());
            }
            if(error.errors.password){
                setErrPassword(error.errors.password.toString());
            }
            setErrMessage(error.message);
            setloading(false)
        });
    }
   
    return (
        <section className="bg-gray-50 dark:bg-gray-900 ">
       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-10 mb-4 mt-14">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up to your account
              </h1>
              <p className='text-red-500'>{errMessage}</p>
              <form className="space-y-4 md:space-y-6" onSubmit={formData}>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name or username</label>
                      <input type="text" name="name" 
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      placeholder="username Or email" required/>
                      
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" 
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      placeholder="username Or email" required/>
                      <p className='text-red-500'>{errEmail}</p>
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"
                      onChange={handleChange}
                      name="password" 
                       placeholder="•••••••"
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      
                      required/>
                      <p className='text-red-500'>{errPass}</p>
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                      <input type="password"
                      onChange={handleChange}
                      name="password_confirmation"  placeholder="•••••••"
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      
                      required/>
                  </div>
                  
                    
                
                  <button type="submit" disabled={loading} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">{loading? <Spinner/>:'Sign Up'} </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account ? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    );
};

export default Register;