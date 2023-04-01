import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { FcCheckmark } from 'react-icons/fc';
import { BsArrowRight, BsArrowLeft,BsCashCoin } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../progressbar/Spinner';
// import bkashImg from '../../img/bkash.jpg';
import SSL from '../../img/ssl.jpg';
import { toast } from 'react-hot-toast';
import axios from '../../utils/axios.config';
import { cartPersistency } from '../../features/cart/cartSlice';
import { authUser } from '../../features/auth/authSlice';
import { useShopInfoQuery } from '../../api/appInfo';
import Loading from '../../progressbar/Loading';
const Checkout = () => {
    document.title = 'Checkout';
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryBDT, setDeliveryBDT] = useState(0);

    
    const {data,isLoading} = useShopInfoQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.auth);
    const [userAddress,setUserAddress] = useState(user?.address?.filter(address => address.default ===1)[0]);
    useEffect(()=>{
        setUserAddress(user?.address?.filter(address => address.default ===1)[0]);
        setDeliveryBDT(data?.shopInfo?.shipping_charge);
    },[user?.address,data?.shopInfo?.shipping_charge]);
    if(isLoading){
        return <Loading/>
    }
    const handleNextStep = () => {
        if(currentStep === 2 && !paymentMethod){
            toast.error('Please, select payment option');
            return 
        }
        if(user?.address?.length <=0){
            toast.success('Please Add Address');
            navigate('/user/address/create');
        }else{
         setCurrentStep(currentStep + 1);

        if(currentStep === 3){
            
            axios.post('api/checkout',
            {   cart:cart,
                total:totalBDT+deliveryBDT,
                payment_type:paymentMethod,

                name :userAddress.fullname,
                phone :userAddress.phone,
                division :userAddress.division,
                district :userAddress.district,
                sub_district :userAddress.sub_district,

                address : `${userAddress.street_address},${userAddress.area}`,

                zipcode :userAddress.zipcode
            })
            .then(res =>{
                if(res?.data?.status === 200){
                    localStorage.setItem('cart',JSON.stringify([]));
                    dispatch(cartPersistency([]));
                    toast.success(res.data.message);
                    dispatch(authUser());
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
        }


        }
    };
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    let orderInfo = '';
    let totalBDT = 0;
    switch (currentStep) {
        case 1:
            orderInfo = <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8'>
              
                <div className='bg-white shadow rounded-xl p-2'>
                {
                    cart?.map((product,index) => {
                        totalBDT += product.price * product.qty;
                       return(
                         <li key={index} className="flex py-6">
                         <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                           <img
                             src={process.env.REACT_APP_SERVER_URL+ product.image}

                             alt={process.env.REACT_APP_SERVER_URL+ product.image}
                             className="h-full w-full object-cover object-center p-1"
                           />
                         </div>

                         <div className="ml-4 flex flex-1 flex-col">
                           <div>
                             <div className="flex justify-between text-base font-medium text-gray-900">
                               <h3 className='text-justify'>
                                {product?.name.slice(0,80)}
                               </h3>  
                               <p className="ml-4 font-bold text-xl">
                               &#2547;
                                 {product.price}</p>
                             </div>
                             
                             {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                           </div>
                           {product.size ? <span > <span className='font-bold'>
                           Size :
                             </span> {product.size}</span>:null}
                           <div className="flex flex-1 items-end justify-between text-sm">
                             <p className="text-gray-500 w-full flex flex-1">
                             <span className='mr-1 border text-center w-8 pt-1 font-semibold my-1' >
                             {product?.qty}
                             </span>
                             </p>
                           </div>
                         </div>
                       </li>
                       )})
                }
                </div>
                {/* address */}
                 <div>
                    <h3 className='font-bold'><MdLocationOn className='inline'/> Delivery Address</h3>
                    {!user?.address?.length <= 0 ? <>
                    {
                        user?.address
                        ?.filter(ad => ad.default === 1 )
                        .map( (address) => <div key={address.id} 
                        className="mt-3 bg-white shadow cursor-pointer rounded-xl"
                        >
                        
                             <div className="flex">
                                
                                <div className="flex-1 py-5 pl-1 overflow-hidden mx-2">
                                  
                                   <ul>
                                      <li className="text-xl text-gray-800 uppercase"><b>{address.fullname}</b></li>
                                      <li className='text-xl'>{address.phone}</li>
                                      <li>{address.street_address}  {address.holding+','} {address.area} ,</li>
                                      <li>{address.sub_district} , {address.district}, {address.division}</li>
                                   </ul>
                                </div>
                                
                                </div>             
                             </div>
                          )
                    }</>: <Link 
                    to="/user/address/create"
                    className='block font-bold text-center my-4 underline'>Please Add Address</Link> }
                                <>
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">&#2547;{totalBDT}</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">&#2547;{deliveryBDT}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">&#2547;{totalBDT+deliveryBDT}</p>
                    </div>
    
    
                 </>
                </div>
            </div>
            break;
            case 2:
            orderInfo = <div>

                <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Select Payment Option</h3>
                <ul className="grid w-full gap-6 md:grid-cols-2">
                    <li>
                        <input type="radio"
                        onClick={()=>setPaymentMethod('COD')}
                        id="hosting-small" name="hosting" value="hosting-small" 
                        defaultChecked={paymentMethod ==='COD'? true:false}
                        className="hidden peer" required/>
                        <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <div className="block">
                                <div className="w-full text-lg font-semibold"> <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"><TbTruckDelivery 
                                className='inline mx-3 text-3xl'/> Cash On Delivery</label></div>
                                
                            </div>
                        
                        </label>
                    </li>
                    <li>
                        <input type="radio"
                        onClick={()=>setPaymentMethod('BKASH')}
                        disabled
                        id="hosting-big" name="hosting" value="hosting-big" 
                        defaultChecked={paymentMethod ==='BKASH'? true:false}className="hidden peer"/>
                        <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">

                                    <label  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                                        <img src={SSL} alt="ssl" 
                                        width="100"
                                        className='inline'
                                        />  Payment getway coming soon </label>
                                </div>
                                
                            </div>
                        
                        </label>
                    </li>
                </ul>
            </div>
            break;
        case 3:
            // order confirmation
            orderInfo = <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8'>
                
                {/* products */}
                <div className='bg-white shadow rounded-xl p-2'>
                {
                    cart?.map((product,index) => {
                        totalBDT += product.price * product.qty;
                       return(
                         <li key={index} className="flex py-6">
                         <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                           <img
                             src={process.env.REACT_APP_SERVER_URL+ product.image}

                             alt={process.env.REACT_APP_SERVER_URL+ product.image}
                             className="h-full w-full object-cover object-center p-1"
                           />
                         </div>

                         <div className="ml-4 flex flex-1 flex-col">
                           <div>
                             <div className="flex justify-between text-base font-medium text-gray-900">
                               <h3 className='text-justify'>
                                {product?.name.slice(0,80)}
                               </h3>  
                               <p className="ml-4 font-bold text-xl">
                               &#2547;
                                 {product.price}</p>
                             </div>
                             
                             {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                           </div>
                           {product.size ? <span > <span className='font-bold'>
                           Size :
                             </span> {product.size}</span>:null}
                           <div className="flex flex-1 items-end justify-between text-sm">
                             <p className="text-gray-500 w-full flex flex-1">
                             <span className='mr-1 border text-center w-8 pt-1 font-semibold my-1' >
                             {product?.qty}
                             </span>
                             </p>
                           </div>
                         </div>
                       </li>
                       )})
                }
                </div>

                {/* address */}
                <div>
                <div className="border my-3 p-3">
                <h3 className='font-bold'><BsCashCoin className='inline text-xl text-green-600 '/> Payment Option : {paymentMethod === 'COD' ? <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"><TbTruckDelivery 
                                className='inline mx-3 text-3xl'/> Cash On Delivery</label>:null}</h3>
                </div>


                    <h3 className='font-bold'><MdLocationOn className='inline text-xl'/> Delivery Address</h3>
                    {!user?.address?.length <= 0 ? <>
                    {
                        user?.address?.filter(ad => ad.default ===1)
                        .map( (address) => <div key={address.id} 
                        className="mt-3 bg-white shadow cursor-pointer rounded-xl"
                        >
                        
                             <div className="flex">
                                
                                <div className="flex-1 py-5 pl-1 overflow-hidden mx-2">
                                  
                                   <ul>
                                      <li className="text-xl text-gray-800 uppercase"><b>{address.fullname}</b></li>
                                      <li className='text-xl'>{address.phone}</li>
                                      <li>{address.street_address}  {address.holding+','} {address.area} ,</li>
                                      <li>{address.sub_district} , {address.district}, {address.division}</li>
                                   </ul>
                                </div>
                                
                                </div>             
                             </div>
                          )
                    }</>: <Link 
                    to="/user/address/create"
                    className='block font-bold text-center my-4 underline'>Please Add Address</Link> }
                                <>
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">&#2547;{totalBDT}</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">&#2547;{deliveryBDT}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">&#2547;{totalBDT+deliveryBDT}</p>
                    </div>

                    
                 </>
                </div>
                
            </div>
            break;
            case 4:
            orderInfo = <div className='my-32'><Spinner/></div>
            break;
    
        default:
            break;
    }

    return (<div className='mb-14 mt-2 lg:w-9/12 lg:mx-auto'>

        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 overflow-x-auto">

            <li className={`flex items-center 
            text-green-600
            dark:text-blue-500  ${currentStep > 1 ? 'text-green-700' : ""}`}>
                <span className={`flex items-center justify-center w-5 h-5 mr-1 text-xs border border-green-700  rounded-full shrink-0 dark:border-blue-500 ${currentStep > 1 ? 'border-green-700' : ''}`}>
                    {currentStep > 1 ? <FcCheckmark /> : 1}
                </span>
                Checkout Products <span className="hidden sm:inline-flex sm:ml-2"></span>
                <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
            </li>

            <li className={`flex items-center ${currentStep > 2 ? 'text-green-700' : ''}`}>
                <span className={`flex items-center justify-center w-5 h-5 mr-1 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400 ${currentStep > 2 ? 'border-green-700' : ''}`}>
                    {currentStep > 2 ? <FcCheckmark /> : 2}
                </span>
                Payment  <span className="hidden sm:inline-flex sm:ml-2">Option </span>
                <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
            </li>
            <li className={`flex items-center ${currentStep > 3 ? 'text-green-700' : ''}`}>
                <span className={`flex items-center justify-center w-5 h-5 mr-1 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400 ${currentStep > 3 ? 'border-green-700' : ''}`}>
                    {currentStep > 3 ? <FcCheckmark /> : 3}
                </span>
                Order Confirmation
            </li>

        </ol>
        <div className="mx-6 my-6">
            {orderInfo}
        </div>
        <div className="flex justify-between my-6 mx-6 lg:mx-2">

            <button
                className={classNames(
                    'px-2 py-1 rounded-lg mr-2',
                    {
                        'bg-gray-400': currentStep === 1,
                        'bg-blue-500': currentStep !== 1,
                    },
                )}
                onClick={handlePrevStep}
                disabled={currentStep === 1}
            >
                <BsArrowLeft className="inline mx-2" />
                <span>Previous</span>
            </button>
            <button
                className={classNames(
                    'px-3 py-1 font-medium text-white capitalize   bg-black rounded-md transition duration-300 transform active:scale-95 ease-in-out',
                    {
                        'bg-gray-400': currentStep === 4,
                        'bg-blue-500': currentStep !== 4,
                    },
                )}
                onClick={handleNextStep}
                disabled={currentStep === 4}
            >
                <span>{currentStep === 3 ? 'Confirm Order':'Next'}</span>
                <BsArrowRight className='inline mx-2 ' />
            </button>

        </div>

    </div>);
};

export default Checkout;



