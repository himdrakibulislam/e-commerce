import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser } from '../../features/auth/authSlice';
import axios from '../../utils/axios.config';
const Address = () => {
    const {user} = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    const deleteAddress = (id) =>{
        axios.delete(`api/address/delete/${id}`)
        .then(res =>{
            if(res.data.status === 200){
                dispatch(authUser());
                toast.success(res.data.message)
             }
         })
        .catch(err => console.log(err));
    }
    const setAsDefault =(id) =>{
      axios.put(`api/address/default/${id}`)
        .then(res =>{
            if(res.data.status === 200){
                dispatch(authUser());
                toast.success(res.data.message)
             }
         })
        .catch(err => console.log(err));
    }

    
    return (
        <div className="m-auto w-full md:w-6/12 md:mx-auto my-10 px-2">
      <div>
         <div className="mt-5 bg-white rounded-lg shadow">
            <div className="flex">
               <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <svg className="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                     <g>
                        <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                        <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                        <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                     </g>
                  </svg>
                  <h1 className="inline text-2xl font-semibold leading-none">Delivery Address</h1>
               </div>
               <div className='flex-1 py-5 pl-5 overflow-hidden'>
               <Link to="create" className="relative w-full flex justify-center items-center px-5 py-1.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg"  height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
               <g>
                  <rect fill="none" height="24" width="24"></rect>
               </g>
               <g>
                  <g>
                     <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
               </g>
            </svg>
            
          <span className='text-sm'> Add Address</span>
          
           </Link>
            </div>
            </div>

            
           

        </div>
        
        {user?.address.length <= 0 ? <div className='text-center my-14'>
            <h3 >No Address </h3>
            <Link to="/user/address/create" className='underline'>Add Address</Link>
        </div> : null}
       { user?.address 
       
       .map( (address) => <div key={address.id} 
       className="mt-5 bg-white shadow cursor-pointer rounded-xl"
       >
        {address.default ===1 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-100">Default Address</span> :null}
            <div className="flex">
               
               <div className="flex-1 py-5 pl-1 overflow-hidden mx-2">
                 
                  <ul>
                     <li className="text-xl text-gray-800 uppercase"><b>{address.fullname}</b></li>
                     <li className='text-xl'>{address.phone}</li>
                     <li>{address.street_address}  {address.holding+','} {address.area} ,</li>
                     <li>{address.sub_district} , {address.district}, {address.division}</li>
                  </ul>
                  
               </div>



              
               {
                  address.default ===1 ? null :
              
               <div className="flex-none pt-2.5 pr-2.5 pl-1">
                  <button type="button" 
                  onClick={()=>deleteAddress(address.id)}
                  className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95 hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">

                    
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                     </svg>
                    
                  </button>
               </div>}



               <div className="flex-none pt-2.5 pr-2.5 pl-1">
                  <Link to={'edit/'+address.id}  className="block px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 ">

                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path>
                        <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                     </svg>
                  </Link>
                  <br />
              
             

               
               </div>
              
             
            </div>
            {
               address.default ===1?null:<button 
               onClick={()=>setAsDefault(address.id)}
               className='text-sm mx-3 mb-4 bg-black text-slate-50 p-2 rounded'>Use As Default</button> 
            }
         </div>)}
         
      </div>
   </div>
    );
};

export default Address;