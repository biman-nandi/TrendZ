import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import mypic from "../Assets/mypic.jpeg"
import { CiSearch } from "react-icons/ci";
import { MdFilterAlt } from "react-icons/md";
import { CgShapeRhombus } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";




export function Orders() {
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

    return(
        <div>
            <Navbar />

                <main className="mt-15 grid grid-cols-3 gap-10 px-[10vw] lg:px-[15vw]">
                    <ul className="col-span-1 sticky top-10 self-start">
                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={() => navigate('/profile')}>Personal Information</li>

                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-700 font-bold">My Orders</li>

                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={() => navigate('/profile/manage-address')}>Manage Address</li>

                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={handleLogOut}>Log out</li>
                    </ul>

                    <div className="col-span-2">
                        {/* Title - Search - Filter */}
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-lg w-[60%]">All orders</h1>

                            <div className="flex gap-2 lg:gap-4">
                                <div className="flex items-center border border-gray-300 px-4 py-2  lg:w-50 rounded-full">
                                    <CiSearch className="mr-1 text-lg" />
                                    <input type="text" placeholder="Search" className="w-full outline-none" />
                                </div>

                                <div className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-full">
                                    <MdFilterAlt />
                                    Filters
                                </div>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="p-2 h-full mt-2">
                            <div className="bg-[#ffff] p-5 mb-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CgShapeRhombus className="text-2xl" />
                                    <div>
                                        <h6 className="font-bold tracking-wide">In Transit</h6>
                                        <p className="text-gray-400 text-sm tracking-wider">Arriving tomorrow</p>
                                    </div>
                                </div>

                                <div className="border border-gray-300 hover:bg-[#ececec] cursor-pointer rounded-2xl flex justify-between items-center p-5 mt-3">
                                    <div className="flex">
                                        <div className="w-24 h-24 shrink-0">
                                            <img src={mypic} alt="" className="rounded-xl" />
                                        </div>

                                        <div className="pl-4">
                                            <h6 className="font-bold text-sm lg:text-base">Peter England</h6>
                                            <p className="text-xs lg:text-sm text-gray-400">Men Blue Formal Shirt</p>
                                            <p className="text-xs lg:text-sm text-gray-400">Size: 39</p>
                                        </div>
                                    </div>

                                    <IoIosArrowForward className="text-xl" />
                                </div>
                            </div>

                            <div className="bg-[#ffff] p-5 mb-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CgShapeRhombus className="text-2xl" />
                                    <div>
                                        <h6 className="font-bold tracking-wide">In Transit</h6>
                                        <p className="text-gray-400 text-sm tracking-wider">Arriving tomorrow</p>
                                    </div>
                                </div>

                                <div className="border border-gray-300 hover:bg-[#ececec] cursor-pointer rounded-2xl flex justify-between items-center p-5 mt-3">
                                    <div className="flex">
                                        <div className="w-24 h-24 shrink-0">
                                            <img src={mypic} alt="" className="rounded-xl" />
                                        </div>

                                        <div className="pl-4">
                                            <h6 className="font-bold text-sm lg:text-base">Peter England</h6>
                                            <p className="text-xs lg:text-sm text-gray-400">Men Blue Formal Shirt</p>
                                            <p className="text-xs lg:text-sm text-gray-400">Size: 39</p>
                                        </div>
                                    </div>

                                    <IoIosArrowForward className="text-xl" />
                                </div>
                            </div>

                            <div className="bg-[#ffff] p-5 mb-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CgShapeRhombus className="text-2xl" />
                                    <div>
                                        <h6 className="font-bold tracking-wide">In Transit</h6>
                                        <p className="text-gray-400 text-sm tracking-wider">Arriving tomorrow</p>
                                    </div>
                                </div>

                                <div className="border border-gray-300 hover:bg-[#ececec] cursor-pointer rounded-2xl flex justify-between items-center p-5 mt-3">
                                    <div className="flex">
                                        <div className="w-24 h-24 shrink-0">
                                            <img src={mypic} alt="" className="rounded-xl" />
                                        </div>

                                        <div className="pl-4">
                                            <h6 className="font-bold text-sm lg:text-base">Peter England</h6>
                                            <p className="text-xs lg:text-sm text-gray-400">Men Blue Formal Shirt</p>
                                            <p className="text-xs lg:text-sm text-gray-400">Size: 39</p>
                                        </div>
                                    </div>

                                    <IoIosArrowForward className="text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            <Footer />
        </div>
    )
}