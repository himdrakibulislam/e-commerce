import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import logo from '../../img/logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BsDownload } from 'react-icons/bs';
import { useRef } from 'react';
import ProductNotFound from '../../components/ProductNotFound';
import { useShopInfoQuery } from '../../api/appInfo';
import Loading from '../../progressbar/Loading';

const Invoice = () => {
    document.title = 'Invoice';

    const {user} = useSelector(state => state.auth);
    const {orderId} = useParams();
    const InvoiceOrder = user?.orders.find(order => order.id === parseInt(orderId));
    const {data,isLoading} = useShopInfoQuery();
    
    const componentRef = useRef(null);
    // download invoice 
    const downloadInvoice = () => {
    const component = componentRef.current;
    html2canvas(component).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0,210,297);
      pdf.save('invoice.pdf');
    });
      };
    if(isLoading){
        return <Loading/>
    }
    return (
        <>
        {InvoiceOrder ? <>
            <div className="my-8 m-auto w-full md:w-8/12 md:mx-auto my-10 px-2 ">
         <button 
        className=' mx-auto px-3 py-1 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out my-3'
        onClick={()=>window.history.back(-1)}>
        Back
        </button>
        <button
        onClick={downloadInvoice}
        className='float-right inline border py-1 px-2 rounded bg-blue-500 text-white p-2'
        >
        Download Invoice <BsDownload className='inline'/>  </button>
         </div>
         {/* invoice */}
        <div ref={componentRef}  className='my-8 m-auto w-full md:w-6/12 md:mx-auto my-10 px-2 shadow rounded p-2'>
            

            <div className="flex justify-between">
                <h5 className='text-sm lg:text-3xl font-bold' >Invoice   #{InvoiceOrder.order_number}</h5>
                <div>
                <img src={logo}
                className="rounded m-2" 
                width="50"
                alt="SiteLogo" />
                <br />
                <h3 className='text-sm lg:text-2xl font-bold '>{data?.shopInfo?.shop_name}</h3>
                <div dangerouslySetInnerHTML={{__html:data?.shopInfo?.shop_location}}>
                    
                </div>
                {/* <p> <span>Shop no : 215/16,</span>
                <br />
                    <span>2nd floor shah sriti market, </span>
                    <br />
                    <span>Mirpur-1, Dhaka-1216</span> </p> */}

                <span className='text-gray-500 mt-6'> {new Date(InvoiceOrder.created_at).toLocaleString()} </span>
                </div>
            </div>
            <div>
                <p className='text-lg lg:text-2xl font-bold'>
                    Bill To 
                </p>
                <p>
                    <span><b>Name :</b> {InvoiceOrder.name}</span>
                    <br />
                    <span><b>Contact No :</b> {InvoiceOrder.phone}</span>
                    <br />
                    <b>Address : </b>
                    
                   <span> {InvoiceOrder.address},</span>
                   <br />
                    <span>  {InvoiceOrder.sub_district},</span>
                
                    <span>{InvoiceOrder.district},</span>
                   
                   <span> {InvoiceOrder.division}</span>
                </p>
                <small><b>Payment Option:</b> {InvoiceOrder.payment_type}</small>
            </div>

            
                <div className="relative overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-l-lg">
                                    Item
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty/Size
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-r-lg">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            InvoiceOrder.order_items.map(item => <tr
                            key={item.id}
                            className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.product.name.slice(0,20)}
                            </th>
                            <td className="px-6 py-4">
                                {item.quantity}
                                <br />
                                {item.size ? <small><b>Size :</b> {item.size}</small> :null}
                            </td>
                            <td className="px-6 py-4">

                            &#2547; {item.product.selling_price}
                            
                            </td>
                        </tr>)
                        }   
                        

                        </tbody>
                       
                    </table>
                    <hr className="h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"/>

                    <div className="mt-6 border-t border-b py-2 w-6/12 float-right">

                        {/* <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">&#2547;{InvoiceOrder.total}</p>
                        </div> */}

                        {/* <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">&#2547;{data?.shopInfo?.shipping_charge}</p>
                        </div> */}

                        <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">&#2547;{InvoiceOrder.total}</p>
                    </div>
                    </div>

                   
                </div>

        </div>
        </>: <ProductNotFound/>}
        
        
      
        </>
    );
};

export default Invoice;
