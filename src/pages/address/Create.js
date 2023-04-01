import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDivisionQuery } from '../../api/appInfo';
import { authUser } from '../../features/auth/authSlice';
import axios from '../../utils/axios.config';
import Spinner from '../../progressbar/Spinner';

const Create = () => {
    const {isLoading,data} = useDivisionQuery();
    
    const [districts,setDistricts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address,setAddress] = useState({
        fullname:"",
        phone:"",
        division:"",
        district:"",
        sub_district:"",
        union:"",
        holding:"",
        area:"",
        street_address:"",
        zipcode:"",
    });
    
    const handleChange =({currentTarget:input}) =>{
        setAddress({...address,[input.name]:input.value});
       
    }
    const addressSubmit = (e) =>{
        e.preventDefault();
        axios.post('api/create-address',address)
        .then(res =>{
           if(res.data.errors){
            toast.error(res.data.errors.phone.toString());
           }
           if(res.data.status === 200){
            toast.success(res.data.message);
            dispatch(authUser());
            navigate(window.history.back(-1));
        }})
        .catch(err => console.log(err.response.data));
    }
    
    useEffect(()=>{
     
      const dt  =  data?.divisions.find(dvs => dvs.division_name === address.division);
      setDistricts(dt?.districts||[]);
      
    },[address?.division,data?.divisions]);


    if(isLoading){
      return <div className='my-14'><Spinner/></div>
    }
  
    return (
     <div className='m-auto w-full md:w-6/12 md:mx-auto my-10 px-2'>
      
      <div>
      <button 
      className='px-3 py-1 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out'
      onClick={()=>window.history.back(-1)}>
       Back
      </button>
      </div>
      
        <form onSubmit={addressSubmit}>
        <div className="px-5 pb-2">
            <div>
            <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Full Name 
            <small 
            className='text-2xl text-red-400'>
            *
            </small>
            </label>
            <input type="text" id="fullname"
            name='fullname'
            onChange={handleChange}
            className="bg-gray-50 border border-cyan-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required/>
           </div>

           <div className='grid grid-cols-2 gap-4'>
           <div>
             <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Contact Number  <small 
            className='text-2xl text-red-400'>
            *
            </small></label>
             <input type="number"
             name="phone"
             onChange={handleChange}
             className="bg-gray-50 border border-cyan-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01xxxxxxxxx" required/>
           </div> 


           <div>
             <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Zip Code 
             <small 
              className='text-2xl text-red-400'>
            *
            </small>
             </label>
             <input type="number" 
             id="zipcode"
             name='zipcode'
             onChange={handleChange}
             className="bg-gray-50 border border-cyan-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Zip code" required/>
           </div> 
           </div>


          <div className='grid grid-cols-2 gap-4'>
          <div >
            <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Division
            <small 
            className='text-2xl text-red-400'>
            *
            </small>
            </label>

            <select id="division" 
            name='division'
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="">Select</option>
              {
                data?.divisions.map(ds => <option 
                value={ds.division_name}
                 key={ds.id}>
                  {ds.division_name}
                </option>)
              }
              
            </select>
            </div>


            <div>
            <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">District (City)
            <small 
            className='text-2xl text-red-400'>
            *
            </small>
            </label>
            <select id="countries"
            name='district'
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="">Select</option>
              {
                districts.map(ds => <option 
                value={ds.district_name}
                 key={ds.id}>
                  {ds.district_name}
                </option>)
              }
            </select>
            </div>
          </div>
          



            <div>
            <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Sub-district (Upazilla)
            <small 
            className='text-2xl text-red-400'>
            *
            </small>
            </label>
            <input id="countries"
            name='sub_district'
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              
              
         
            </div>
 
           

            <div>
             <label  className="block mb-2 text-sm font-medium text-gray-500 my-2"> House/Holding </label>
             <input type="text" id="holding"
             name='holding'
             onChange={handleChange}
             className="bg-gray-50 border border-cyan-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter House/Holding No" />
           </div> 


            <div>
             <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Area 
              <small 
            className='text-2xl text-red-400'>
            *
            </small></label>
             <input type="text" id="area" 
             name='area'
             onChange={handleChange}
             className="bg-gray-50 border border-cyan-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Area" required/>
           </div> 


            <div>
             <label  className="block mb-2 text-sm font-medium text-gray-500 my-2">Street Address 
             <small 
            className='text-2xl text-red-400'>
            *
            </small>
             </label>
             <input type="text" id="street_address"
             name='street_address' 
             onChange={handleChange}
             className="bg-gray-50 border border-cyan-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Street Address" required/>
           </div> 


           

            {/* 
            <div className="flex items-center pt-3"><input type="checkbox" className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"/><label className="block ml-2 text-sm text-gray-900">Save as default address</label></div> */}

          </div>
            
           
           <div className="flex flex-row-reverse p-3">
               <div className="flex-initial pl-3">
                  <button type="submit"  className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                     </svg>
                     <span className="pl-2 mx-1">Save</span>
                  </button>
               </div>
              
            </div>
        </form>
     </div>
    );
};

export default Create;