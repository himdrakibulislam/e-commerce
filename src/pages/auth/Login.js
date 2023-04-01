import Cookies from 'js-cookie';
import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import axios from '../../utils/axios.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { toast } from 'react-hot-toast';

const provider = new GoogleAuthProvider();

const Login = () => {
    document.title = 'Login';
    
    const [errEmail,setEmailErr] = useState();
    const [errMessage,setErrMessage] = useState();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        email:"",
        password:""
    });
    const handleChange =({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value});
        setEmailErr('');
        setErrMessage('');
    }
    const formData = async(e) => {
        e.preventDefault();
        setLoading(true)
        axios.post('login',data)
        .then(res => {
            Cookies.set('authCookie',res.data.token, { expires: 3 });
            window.location.href='/';
            setLoading(false)
           })
        .catch(err => {
            setLoading(false);
            setEmailErr(err.response.data.errors.email.toString());
            setErrMessage(err.response.data.message)});
    }
   
    const signInWithGoogle = () => {
     signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
       const user = result.user;
       
        const social = {
        name:user.displayName,
        email:user.email,
        social_type:'google',
        photoURL:user.photoURL
        }
        axios.post('api/social',social)
        .then(res => {
            Cookies.set('authCookie',res.data.token, { expires: 3 });
            window.location.href='/';
           })
        .catch(err => { toast.error('Something Went Wrong') });
    
      }).catch((error) => {
        GoogleAuthProvider.credentialFromError(error);
      });
    }
   
    return (
   <section className="bg-gray-50 dark:bg-gray-900 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <p className='text-red-500'>{errMessage}</p>
              <form className="space-y-4 md:space-y-6" onSubmit={formData}>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email"
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      placeholder="username Or email" required/>
                      <p className='text-red-500'>{errEmail}</p>
                  </div>

                  
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"
                      onChange={handleChange}
                      name="password" id="password" placeholder="•••••••"
                      className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      
                      required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <Link to="/forgot-password" className="text-sm font-medium text-slate-50 hover:underline dark:text-slate-50">Forgot password?</Link>
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
          
        {loading ? 'Loading...' : 'Sign in'}  
        </button>


              </form>
              
              <div className="text-center">

              <button type='button'
              onClick={signInWithGoogle}
              className="login-with-google-btn w-full mt-4" >
              Sign in with Google 
             </button>
              </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>

                  

          </div>
      </div>
  </div>
</section>
    );
};

export default Login;