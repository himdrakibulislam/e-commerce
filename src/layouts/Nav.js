import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiOutlineLogout } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import logo from '../img/logo.png';
import userImage from '../img/user.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authToken, authUser, setUser } from '../features/auth/authSlice';
import axios from '../utils/axios.config';
import Cookies from 'js-cookie';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { cartPersistency, setDialogStatus, setSearchDialog } from '../features/cart/cartSlice';






function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Nav() {
  const { pathname } = useLocation();

  const navigation = [
    { name: 'Products', href: '/products', current: pathname?.includes('products') ? true : false },
    { name: 'Categories', href: '/categories', current: pathname?.includes('categories') ? true : false }
  ];
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(authUser());
    dispatch(authToken());
    dispatch(cartPersistency(JSON.parse(localStorage.getItem('cart')) || []));

  
    //firebase auth persistency
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     dispatch(setUser({
    //       name:user.displayName,
    //       email:user.email,
    //       photoURL:user.photoURL,
    //       authType:user.providerId
    //       }));        
    //   }else{ 

    //   }
    // });
  }, [dispatch]);

  const logoutUser = () => {
    if (user.social_type) {
      signOut(auth).then(() => {
        dispatch(setUser({}));
      }).catch((error) => {
        // An error happened.
      });
    }
    axios.post('api/logout', { 'id': user.id, 'social_type': user?.social_type })
      .then(res => {
        if (res.data.status === 200) {
          Cookies.remove('authCookie');
          dispatch(authToken());
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto lg:hidden h-12 w-auto lg:block rounded-3xl"
                      src={logo}
                      alt="Ekantomart"
                    />
                    <img
                      className="hidden h-12 w-auto lg:block rounded-3xl"
                      src={logo}
                      alt="Ekantomart"
                    />
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>


              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <button type="button"

                  onClick={() => dispatch(setSearchDialog(true))}

                  className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white focus:outline-none  mr-1 focus:text-cyan-500">
                  <BsSearch className="h-6 w-6" aria-hidden="true" />

                </button>



                <button type="button"
                  onClick={() => dispatch(setDialogStatus(true))}
                  className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white focus:outline-none  mr-1 focus:text-cyan-500">

                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />

                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs  text-white bg-cyan-500   rounded-full -top-2 -right-2 ">{cart?.length}</div>
                </button>

                {/* Profile dropdown */}
                {token ? <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>


                      {user?.photoURL ?
                        <img
                          src={user.social_type ? user?.photoURL : process.env.REACT_APP_SERVER_URL + user.photoURL} className="h-8 w-8 rounded-full" alt="logo" />
                        :
                        <img
                          src={userImage} className="h-8 w-8 rounded-full" alt="user" />}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                      <Menu.Item>
                        {({ active }) => (
                          <div

                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}
                          >


                            {user?.photoURL ?
                              <img
                                src={user.social_type ? user?.photoURL : process.env.REACT_APP_SERVER_URL + user.photoURL} className="rounded-full mr-2 w-6 h-6" alt="logo" />
                              :
                              <img
                                src={userImage} className="h-6 w-6 rounded-full" alt="user" />}

                            <div className='mx-1'>
                              <small className='text-sm block'>{user.name}</small>

                              <small className='font-thin	'>{user.email?.slice(0, 25)}</small>
                            </div>
                            <br />

                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user/my-orders"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            My Orders
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutUser}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full')}
                          >
                            <HiOutlineLogout className='inline w-4' />  Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> : <Link
                  to="/login"
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  Login
                </Link>}






              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  // as="a"
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

