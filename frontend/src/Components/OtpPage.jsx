import { useNavigate, useLocation } from "react-router-dom"
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";

export function OtpPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const {email, mobile} = location.state || {}
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (!location.state) {
            navigate("/login", {replace: true})
        }
    }, [location.state, navigate])

    const handleOtpSubmit = async (formData) => {
        const newOtp = formData.get("verificationCode")

        const loading = toast.loading("Verifying OTP...")

        try {
            setIsLoading(true)

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    mobile,
                    verificationCode: newOtp
                })
            })

            const result = await response.json()

            toast.dismiss(loading)

            if (!response.ok) {
                return toast.error(result.message)
            }

            toast.success("Login successful!")

            navigate("/home")
        } catch (error) {
            toast.dismiss(loading)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="flex justify-center items-center h-screen relative bg-[#bcbcc0]">
            <h1 
                className="
                    font-sekuya 
                    text-xl 
                    sm:text-5xl 
                    font-bold 
                    cursor-pointer
                    absolute
                    w-full
                    text-center
                    top-10
                "
            >
                KriRa
            </h1>

            <div className="h-fit sm:w-1/2 lg:w-1/4 p-5 lg:p-10 shadow-gray-500 shadow-lg rounded-2xl border border-gray-500">
                <h6 className="text-2xl font-bold text-center">Login <span className="font-normal">or</span> Signup</h6>
                <p className="text-gray-600 tracking-wide text-center pt-3 pb-7
                ">One OTP is all you need. Enter your email or phone number to securely access your account or create a new one instantly.</p>

                <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget)
                        handleOtpSubmit(formData)
                    }
                }>

                    <input 
                        type="text" 
                        id="verificationCode"
                        name="verificationCode"
                        placeholder="Enter your OTP"
                        required
                        pattern="^[0-9]{6}$"
                        title="Enter a valid OTP"
                        className="w-full outline-none border border-gray-400 my-4 p-2 bg-gray-300 rounded"
                    />

                    <button disabled={isLoading} type="submit" className="w-full bg-[#121212] text-white py-3 rounded mt-1.5 cursor-pointer hover:scale-[1.02] transition-all duration-300">Log in</button>
                </form>
            </div>
        </div>
    )
}

// bg-[#f6f6f6]