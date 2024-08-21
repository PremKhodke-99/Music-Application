import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    return user ? element : <Navigate to={"/signin"} />;
}

export default ProtectedRoute