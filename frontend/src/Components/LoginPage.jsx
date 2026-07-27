import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useState } from "react";

export function LoginPage() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleGetOtpSubmit = async (formData) => {
        const contacts = formData.get("contact")
        const body = contacts.includes("@") ? {email: contacts} : {mobile: contacts}
        const loading = toast.loading("Sending OTP...");

        try {
            setIsLoading(true)
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(body)
            })

            const result = await response.json()

            toast.dismiss(loading)

            if (!response.ok) {
                return toast.error(result.message)
            }

            toast.success("OTP sent successfully")

            navigate("/verify-otp", {
                state: body
            })
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
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    handleGetOtpSubmit(formData)
                }}>
                    <label htmlFor="contact">Email or Phone</label>

                    <input 
                        type="text" 
                        id="contact"
                        name="contact"
                        placeholder="example@mail.com or 1234567890"
                        required
                        pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10,15})$"
                        title="Enter a valid email address or a 10–15 digit phone number"
                        className="w-full outline-none border border-gray-400 my-4 p-2 bg-gray-300 rounded"
                    />

                    <button disabled={isLoading} type="submit" className="w-full bg-[#121212] text-white py-3 rounded mt-1.5 cursor-pointer hover:scale-[1.02] transition-all duration-300">Get OTP</button>
                </form>
            </div>
        </div>
    )
}

// bg-[#f6f6f6]