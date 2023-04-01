import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../../progressbar/Loading';

const VerifiedUser = ({children}) => {
    const {token,user,isLoading} = useSelector(state=> state.auth);
    if(isLoading){
        return <Loading/>
    }
    if(token && !user.email_verified_at){
        return children;
    }
    return <Navigate to="/"/>;
};

export default VerifiedUser;