import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../../progressbar/Loading';
const ProtectedRoute = ({children}) => {
    const {token,user,isLoading} = useSelector(state=> state.auth);
    if(isLoading){
        return <Loading/>
    }
    if(!token){
       return <Navigate to="/login" />
    }
    else if(token && !user.email_verified_at ){
        return <Navigate to="/verify-otp"/>;
    }
        return children;

    
};
export default ProtectedRoute;