import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import { useState } from "react";

export function MyAddress() {
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    // const [addressData, setAddressData] = useState(null)
    const navigate = useNavigate()

    const handleLogOut = async () => {
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

    const handleSubmit = (formData) => {
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    }

    return(
        <div className="relative">
            <Navbar />

            <main className="mt-15 grid grid-cols-3 gap-10 px-[10vw] lg:px-[15vw]">
                <ul className="col-span-1">
                    <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={() => navigate('/profile')}>Personal Information</li>

                    <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={() => navigate('/profile/orders')}>My Orders</li>

                    <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-700 font-bold">Manage Address</li>

                    <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={handleLogOut}>Log out</li>
                </ul>

                <div className="col-span-2">
                    <div className="flex justify-between items-center w-full mb-3">
                        <h1 className="font-bold text-lg">Saved Addresses</h1>

                        <div onClick={() => setIsAddressOpen(true)} className="border border-gray-300 text-blue-500 text-sm rounded p-2 cursor-pointer hover:text-blue-600">
                            +ADD NEW ADDRESS
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm font-bold mb-2">DEFAULT ADDRESS</p>

                        <div className="border border-gray-300 hover:shadow-lg text-gray-500 text-sm p-3 rounded-lg">
                            <p className="font-bold mb-2">Biman Nandi</p>
                            <p>KP 5-A (Room-3B160) Kings Palace 5 KIIT University</p>
                            <p>KIIT University, Patia, Bhubaneswar</p>
                            <p>Bhubaneswar - 751024</p>
                            <p>Odisha</p>

                            <p className="my-3">Mobile: 8392016262</p>

                            <div className="grid grid-cols-2 text-center border border-gray-300 p-2 text-blue-500">
                                <p className="border-r border-gray-300 cursor-pointer hover:text-blue-600">EDIT</p>
                                <p className="cursor-pointer hover:text-blue-600">REMOVE</p>
                            </div>
                        </div>
                    </div>


                    <div className="mb-5">
                        <p className="text-sm font-bold mb-2">DEFAULT ADDRESS</p>

                        <div className="border border-gray-300 hover:shadow-lg text-gray-500 text-sm p-3 rounded-lg">
                            <p className="font-bold mb-2">Biman Nandi</p>
                            <p>KP 5-A (Room-3B160) Kings Palace 5 KIIT University</p>
                            <p>KIIT University, Patia, Bhubaneswar</p>
                            <p>Bhubaneswar - 751024</p>
                            <p>Odisha</p>

                            <p className="my-3">Mobile: 8392016262</p>

                            <div className="grid grid-cols-2 text-center border border-gray-300 p-2 text-blue-500">
                                <p className="border-r border-gray-300 cursor-pointer hover:text-blue-600">EDIT</p>
                                <p className="cursor-pointer hover:text-blue-600">REMOVE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {isAddressOpen && 
                <div className="fixed top-0 flex justify-center items-center w-full h-full inset-0 backdrop-blur-xs">
                    <div className="bg-gray-200 w-[80%] max-w-120">
                        <h6 className="py-4 mb-3 px-4 bg-white border-b border-gray-400  font-black">ADD NEW ADDRESS</h6>

                        <form action={handleSubmit} className="flex flex-col gap-2 text-gray-600">
                            <div className="bg-white p-3 space-y-5 ">
                                <label htmlFor="name" className="flex flex-col">Name*
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        placeholder="John Doe"
                                        className="border-b border-gray-300 outline-none text-sm" 
                                    />
                                </label>

                                <label htmlFor="mobile" className="flex flex-col">Mobile*
                                    <input 
                                        type="tel" 
                                        name="mobile" 
                                        id="mobile" 
                                        placeholder="1234567890" className="border-b border-gray-300 outline-none text-sm" 
                                    />
                                </label>
                            </div>
                            
                            
                            <div className="bg-white p-3 space-y-5">
                                <div className="flex justify-between">
                                    <label htmlFor="pincode" className="flex flex-col">Pincode*
                                        <input 
                                            type="text" 
                                            name="pincode" 
                                            id="pincode" 
                                            placeholder="Enter your pin code" className="border-b border-gray-300 outline-none text-sm" 
                                        />
                                    </label>

                                    <label htmlFor="state" className="flex flex-col">State*
                                        <input 
                                            type="text" 
                                            name="state" 
                                            id="state" 
                                            placeholder="Enter your state" className="border-b border-gray-300 outline-none text-sm" 
                                        />
                                    </label>
                                </div>

                                <label htmlFor="address" className="flex flex-col">Address(House No, Building, Street, Area)*
                                    <input 
                                        type="text" 
                                        name="address" 
                                        id="address" 
                                        placeholder="Enter your address here" className="border-b border-gray-300 outline-none text-sm" 
                                    />
                                </label>

                                <label htmlFor="localityOrTown" className="flex flex-col">Locality/Town*
                                    <input 
                                        type="text" 
                                        name="localityOrTown" 
                                        id="localityOrTown" 
                                        placeholder="Enter your locality or town" className="border-b border-gray-300 outline-none text-sm" 
                                    />
                                </label>

                                <label htmlFor="cityOrDistrict" className="flex flex-col">City/District*
                                    <input 
                                        type="text" 
                                        name="cityOrDistrict" 
                                        id="cityOrDistrict" 
                                        placeholder="Enter your city or district" className="border-b border-gray-300 outline-none text-sm" 
                                    />
                                </label>
                            </div>

                            <div className="bg-white p-3 space-x-2 space-y-5">
                                <p>Type of Address*</p>
                                <input 
                                    type="radio" 
                                    name="addressName" 
                                    id="home" 
                                    value="home"
                                    defaultChecked
                                />
                                <label htmlFor="home" className="text-sm">Home</label>

                                <input 
                                    type="radio" 
                                    name="addressName" 
                                    id="office" 
                                    className="ml-3"
                                    value="office"
                                />
                                <label htmlFor="office" className="text-sm">Office</label>
                            </div>

                            <div className="bg-white grid grid-cols-2 mt-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddressOpen(false)}
                                    className="cursor-pointer font-bold"
                                >
                                    Cancel
                                </button>
                                <button className="bg-[#8d8d8d] py-3 cursor-pointer hover:bg-[#707070] text-white font-bold">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}