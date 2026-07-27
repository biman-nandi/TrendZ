import { toast } from "react-hot-toast"

export const handleLogOut = async (navigate) => {
        const loading = toast.loading("Logging out...")

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            const result = await response.json()
            
            toast.dismiss(loading)

            if (!response.ok) {
                return toast.error(result.message)
            }

            toast.success("Logout successful!")

            navigate('/login')

        } catch (error) {
            toast.dismiss(loading)
            toast.error(error.message)
        }
    }