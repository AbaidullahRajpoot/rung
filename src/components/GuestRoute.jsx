import React from 'react'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ children }) => {
    return (
        <>
            {(sessionStorage.getItem('user-info_token') == null) ? children : <Navigate to="/dashboard" />}
        </>
    );
}
export default GuestRoute