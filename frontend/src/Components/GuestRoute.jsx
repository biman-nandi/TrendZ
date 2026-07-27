import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export function GuestRoute() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = (async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-auth`, {
                    credentials: 'include'
                })
                
                setIsLoggedIn(response.ok)

            } catch (error) {
                setIsLoggedIn(false)

            } finally {
                setIsLoading(false)
            }
        })

        checkAuth()
    }, [])

    if (isLoading)
        return <h1>Loading...</h1>;

    return isLoggedIn ? <Navigate to='/' replace /> : <Outlet />
}