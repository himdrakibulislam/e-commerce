import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const MyOrder = () => {
    document.title = 'orders';
    const {user} = useSelector(state => state.auth);
    const [orderStatus,setOrderStatus] = useState(0);
    const orders = user?.orders
    ?.filter(order => order.order_status === orderStatus );

    return (
        <>
        { !user?.orders.length <= 0  ? <div className='w-full md:w-8/12 md:mx-auto my-6 px-2 '> 
        <button
        onClick={()=> setOrderStatus(0)}
        className={`border px-6 py-1 rounded-full mr-2 shadow ${orderStatus === 0 ? 'bg-black text-white':null}`}
        >Confirmed 
        </button>

        <button
        onClick={()=> setOrderStatus(1)}
        className={`border px-6 py-1 rounded-full mr-2 shadow ${orderStatus === 1 ? 'bg-black text-white':null}`}
        >Processing 
        </button>
        <button
        onClick={()=> setOrderStatus(2)}
        className={`border px-6 py-1 rounded-full mr-2 shadow ${orderStatus === 2 ? 'bg-black text-white':null}`}
        >Delivered 
        </button>
       

         </div> :null}
       
        <div className='my-8 m-auto w-full md:w-6/12 md:mx-auto my-10 px-2 '>
            { !user?.orders.length <= 0  ? !orders.length <=0 ? orders
                ?.map(order =><div
                key={order.id}
                className="shadow mx-2 py-2 px-2 my-3">
                <div className="mt-4"> 
                   <h3 className='text-sm lg:text-3xl font-bold inline'>Order ID : {order.order_number}</h3>

                   <Link
                   to={`/user/order-invoice/${order.id}`}
                   className='float-right inline border py-1 px-2 rounded w-4/12 text-center '>
                   <FaFileInvoiceDollar className='inline text-gray-500'/> Invoice</Link>

                   <p className='mt-4'> <span className='text-gray-600'>
                   Order Date :
                    </span> {new Date(order.created_at).toLocaleString()} </p>
                   <hr className="h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"/>
                </div>
                {/* product info */}
                <div>
                    {order.order_items?.map(item => <div
                    key={item.id}
                    className="border rounded  my-1"
                    >
                      
                        <img 
                        className='rounded m-3 inline'
                        src={process.env.REACT_APP_SERVER_URL +item?.product?.product_images[0].image} alt="productImage" 
                        width="80"
                        />
                        <p className='inline'>{item?.product?.name.slice(0,20)}...</p>
                       
                        
                        <div className='float-right m-2'>
                        <h3 >&#2547; {item?.product?.selling_price}</h3>
                        <p className='text-gray-600'>Qty : {item.quantity}</p>

                        {item?.size ? <p className='text-gray-600'>Size : {item.size}</p>:null}
                        </div>
                    </div>)}
                    <p className='float-right text-xl'>Total : &#2547; {order.total} </p>
                    <br />
                    <hr className="h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"/>
            
                    {/* payment and delivery */}
                    <div className='grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8'>
                        <div className="my-3">
                            <h3>Payment</h3>
                           {
                            order.payment_type === 'COD' ?  <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 my-3 border rounded block"><TbTruckDelivery 
                            className='inline mx-3 text-3xl'/> Cash On Delivery</label>:null
                           }
                        </div>
                        <div className="my-3">
                            <h3>Delivery</h3>
                            <p className='text-gray-500'>Address</p>
                            <p className='text-gray-700'>{order.address} , {order.sub_district} , 
                            <br />
                            {order.district} , {order.division}</p>
                        </div>
                    </div>
                </div>
            </div> ): <div className='text-center'>
                <p className='font-bold my-32'>No {orderStatus === 1 ? 'Processing':null}
                {orderStatus === 2 ? 'Delivered':null} Orders </p>
            </div> : <div>
                <p className='text-center my-32'>No orders</p>

            </div>
            }
            
        </div>
        </>
    );
};

export default MyOrder;