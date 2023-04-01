import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthExist = ({children}) => {
    const {token,user} = useSelector(state => state.auth);
    
    if(token && user.email){
        return <Navigate to="/"/>
    }
    return children;
};

export default AuthExist;