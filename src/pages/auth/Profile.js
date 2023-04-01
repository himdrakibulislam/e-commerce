  import React, { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link, useNavigate } from 'react-router-dom';
  import axios from '../../utils/axios.config';
  import logo from '../../img/user.png';
  import { toast } from 'react-hot-toast';
  import {authUser} from '../../features/auth/authSlice';
  
  import { BsCloudUploadFill } from "react-icons/bs";
  import { MdPublishedWithChanges } from "react-icons/md";
  import { AiOutlineShoppingCart } from "react-icons/ai";
  import { BsTruck } from "react-icons/bs";
  // import { VscCheck } from "react-icons/vsc";

  const Profile = () => {
    const navigate = useNavigate();
      const {user} = useSelector(state =>state.auth);
      document.title = user.name || 'Profile';
      const dispatch = useDispatch();
      const [passwordModal, setPasswordModal] = useState(false);
      const [profileModal, setProfileModal] = useState(false);
      const [loading, setLoading] = useState(false);
  
      const [passwordType, setPasswordType] = useState('password');
      const [data, setData] = useState({});
      const [errors, setErrors] = useState({
        new_password:'',
        old_password:'',
        message:'',
      });
      const handleChange =({currentTarget:input}) =>{
          setData({...data,[input.name]:input.value});
          setErrors({});
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
      
        axios.post('api/update-password',data)
          .then(res => {
            setLoading(false)
            if(res.data.status === 200){
              setPasswordModal(false);
              navigate('/');
              toast.success(res.data.message);
            }
            setErrors({...errors,message:res.data.message});
          })
          .catch(err => {
            setLoading(false);
            const error = err.response.data.errors;
            if(error.old_password){
              const old_password = error.old_password.toString();
              setErrors({...errors,old_password});
            }
            if(error.new_password){
              const new_password = error.new_password.toString();
              setErrors({...errors,new_password});
            }
            
          });
      }
     
      //change profile 
      const [selectedFile, setSelectedFile] = useState();
      const [checkFile, setCheckFile] = useState(false);
      const imageHandler = (e) => {
      setSelectedFile(e.target.files[0]);
      setCheckFile(true);
      }
     
      const imagesubmission = () => {
        if(!selectedFile){
          return toast.error('Please Select a profile photo');
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('profileImage',selectedFile);

        axios.post('api/change-profile',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
      })
        .then(res =>{
         
          if(res.data.status === 200){
            toast.success(res.data.message);
            setProfileModal(false);
            navigate('/');
            dispatch(authUser());
          
          }
          setLoading(false)
         })
        .catch(err => {
          setLoading(false)
          if(err.response.data.errors.profileImage){
          toast.error(err.response.data.errors.profileImage.toString());
        }})
      }


      return (
          <div>

            <div className='px-4  py-4 shadow-lg text-slate-500 
            grid grid-rows-3 md:grid-rows-1 grid-flow-col col-auto gap-2'>

              <Link 
              to="/user/my-orders"
              className='mr-6 font-bold p-2 border rounded hover:bg-zinc-900 hover:text-white '>
                <AiOutlineShoppingCart 
                className='inline mr-2' size={25}/>
               My Orders
              </Link>
              <Link to="/user/address" className='mr-6 font-bold p-2 border rounded hover:bg-zinc-900 hover:text-white'>
               <BsTruck 
               className='inline mr-2'size={25}/> 
               Delivery Address
              </Link>
              {!user.social_type ? <span 
             onClick={() => setPasswordModal(true)}
              className='mr-6 font-bold p-2 border rounded hover:bg-zinc-900 hover:text-white'>
               <MdPublishedWithChanges 
               className='inline mr-2 'size={25}/>
                Change Password
              </span> :null }
              
            </div>


          
          {user.status === 1 ? <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Warning
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>This Account Has Been Suspended.</p>
            </div>
          </div>:null}
          
          <div className="p-8 bg-white shadow mt-24">  <div className="grid grid-cols-1 md:grid-cols-3">    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">      <div>        <p className="font-bold text-gray-700 text-xl">
          {user.orders?.filter(order=> order.order_status ===0).length}
            </p>        <p className="text-gray-400">Confirm Orders </p>      </div>      <div>           <p className="font-bold text-gray-700 text-xl">
          {user.orders?.filter(order=> order.order_status ===1).length}
            </p>        <p className="text-gray-400">Processing</p>      </div>          <div>           <p className="font-bold text-gray-700 text-xl">
            {user.orders?.filter(order=> order.order_status ===2).length}
            </p>        <p className="text-gray-400">Delivered</p>      </div>    </div>    <div className="relative">   
          
          <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
           
            {user?.photoURL ? 
            <img 
            src={user.social_type ? user?.photoURL : process.env.REACT_APP_SERVER_URL+user.photoURL } className="rounded-full w-48 h-48"  alt="logo" />  
            : 
            <img 
            src={logo} className="rounded-full"  alt="logo" />}

        
    

          </div>
         

 

          </div> 
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
             {!user.social_type ? 
             <button onClick={()=>setProfileModal(true)}  className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Change Profile
             </button> 
             :null}
                

          <Link to="/user/my-orders" className="text-white py-3 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">My Orders</Link>
          
        
            </div>  </div>
            <div className="mt-20 text-center border-b pb-12">    
            
            <h1 className="text-4xl font-medium text-gray-700">{user.name}<span className="font-light text-gray-500"></span></h1>   
            {/* {
          user.email_verified_at ?  <small 
          className=" 
          absolute top-0 right-0 h-10 w-10 text-2xl ">
           <VscCheck className='m-3 border p-1 text-emerald-600	 border-green-500 rounded-full'/>
           </ small>:  <small 
           className=" 
         absolute top-0 right-0 h-10 w-10 text-2xl ">
          <VscCheck className='m-3 border p-1 text-text-stone-300		 border-text-zinc-600	text-stone-300	 rounded-full text-zinc-600'/>
          </ small>
        } */}
            
             <p className="font-light text-gray-600 mt-3">{user.email}</p>
            

          
        {/* channge password modal */}
        {passwordModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative  my-6 mx-auto max-w-full">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h5 className="text-3xl font-semibold mx-12">
                      Change Password
                    </h5>

                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setPasswordModal(false)}
                    >
                      <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className='text-red-600'>{errors.message}</p>
                  <form 
                  onSubmit={handleSubmit}
                  >
                  <div >
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" >
                            Current Password
                          </label>
                          <input className="shadow appearance-none border border-cyan-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
                          type={passwordType}
                          name='old_password' 
                          onChange={handleChange}
                          placeholder="******"
                          required
                          />
                          <p className='text-red-600 my-2'>{errors.old_password}</p>
                    </div>

                  <div >
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" >
                            New Password
                          </label>
                          <input className={"shadow appearance-none border border-cyan-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" } id="password" 
                          type={passwordType} 
                          onChange={handleChange}
                          name='new_password'
                          placeholder="******"
                          required/>
                          <p className='text-red-600 my-2'>{errors.new_password}</p>
                    </div>

                  <div >
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" >
                            Confirm Password
                          </label>
                          <input className="shadow appearance-none border border-cyan-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
                          type={passwordType}
                          onChange={handleChange}
                          name="new_password_confirmation"
                          placeholder="******"
                          required/>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mb-3">
         <input  id="bordered-checkbox-2"
        type="checkbox" 
        onClick={(e) => setPasswordType(e.target.checked ?'text':'password')}
        name="bordered-checkbox" className="w-4 h-4  rounded "/>
         <label  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">Show Password</label>
            </div>
                

            <Link className='block text-end mb-2 text-sky-600 underline' to="/forgot-password" >Forgot Password</Link>
                  
                    


                  <button type="submit"
                    disabled={loading}
                   className="w-full px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow hover:bg-indigo-400 "
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
                  
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
       

       {/* profile modal */}
       {profileModal? <>
        <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w- my-6 mx-auto max-w-full">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h5 className="text-3xl font-semibold mx-12">
                      Change Profile
                    </h5>

                    <button
                      onClick={() => setProfileModal(false) }
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                     
                    >
                      <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="  flex justify-center items-center px-2 py-10">
             <div className="w-[320px] grid gap-2">
            <div className="h-14 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-300">
                <input type="file" name="file" onChange={imageHandler} className="z-20 opacity-0 cursor-pointer h-full w-full" required />
                <div className="absolute flex justify-center items-center gap-2">
                    <img className={`h-8 w-8 rounded-full ${checkFile?'opacity-1':'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : null} alt="profile"/>
                
                    <span className="text-[18px] w-56 truncate">{checkFile?selectedFile?.name:'choose a file'}</span>
                </div>        
            </div>
            <button 
            onClick={imagesubmission}
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow hover:bg-indigo-400 "
              >
           {loading &&  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin inline"  fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" ></circle>
              <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
          </svg>}
          
        <small className='text-xl'><BsCloudUploadFill className='inline m-1'/>{loading ? 'uploading...' : 'Upload'} </small>
        </button>
            
             </div>
              </div>
                  
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
       </> : null}

          </div>  
        </div>
      </div>
      );
  };
  export default Profile;



