import React from 'react'
import AuthContainer from '../features/auth/AuthContainer'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (
        <AuthContainer>
            <Outlet />
        </AuthContainer>
    )
}

export default AuthLayout