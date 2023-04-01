import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../../progressbar/Loading';
const ProtectedCheckout = ({children}) => {
    const {cart} = useSelector(state => state.cart);
    const {token,isLoading} = useSelector(state=> state.auth);
    if(isLoading){
        return <Loading/>
    }
    if(!token){
        return <Navigate to="/login"/>
    }
    if(cart.length <= 0){
        return <Navigate to="/products"/>
    }
    return children;
};

export default ProtectedCheckout;