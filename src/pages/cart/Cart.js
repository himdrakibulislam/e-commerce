import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartQtyDecrement, cartQtyIncrement, removeFromCart, setDialogStatus } from '../../features/cart/cartSlice'



export default function Cart() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {dialogStatus,cart} = useSelector(state => state.cart);
  let totalBDT = 0;
  // const cartProducts = data?.products
  // .filter((product) => cart.map(ids => ids?.ID).includes(product.id)
  // );
  const handleCheckout = () => {
    dispatch(setDialogStatus(false));
    navigate('order/checkout');
  }
  const continueShoping = () =>{
    dispatch(setDialogStatus(false));
    navigate('/products');
  }

  return (
    <Transition.Root show={dialogStatus} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setDialogStatus}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch(setDialogStatus(false)) }
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">

                          
                          <ul className="-my-6 divide-y divide-gray-200">
                            {!cart.length <= 0 ?  cart?.map((product,index) => {
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
                                      <h3>
                                        <Link to={`product/${product?.slug}`}>{product?.name.slice(0,40)}</Link>
                                      </h3>
                                      
                                      <p className="ml-4">
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

                                    <button
                                    className='p-2'
                                    onClick={()=>dispatch(cartQtyDecrement(product?.id))}
                                    >
                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                                    </svg>
                                    </button>
                                    <span className='mx-3 border text-center w-8 pt-1' >
                                    {product?.qty}
                                    </span>

                                  <button
                                  onClick={()=>dispatch(cartQtyIncrement(product?.id))}
                                  >

                                   
                                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                                  </svg>
                                  </button>

                       
                                    </p>
                                  
                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={()=>dispatch(removeFromCart(product.id))}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              )
                              
                              }) : <p className='text-center my-10 font-bold'>Cart is empty</p>}
                          </ul>
                        </div>
                      </div>
                    </div>

                   {!cart?.length <=0 ?  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p> &#2547; {totalBDT}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={continueShoping}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>:null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
