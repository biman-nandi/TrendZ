import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import mypic from "../Assets/mypic.jpeg"
import { handleLogOut } from "../utils/logout";

export default function() {
    const navigate = useNavigate()


    return(
        <div>
            <Navbar />

                <main className="mt-15 grid grid-cols-3 gap-10 px-[10vw] lg:px-[15vw]">
                    <ul className="col-span-1">
                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-black">Personal Information</li>
                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={() => navigate('orders')}>My Orders</li>
                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={() => navigate('manage-address')}>Manage Address</li>
                        
                        <li className="px-3 py-2 my-3 hover:bg-[#121212] hover:text-white text-lg rounded-2xl cursor-pointer border border-gray-300" onClick={handleLogOut}>Log out</li>
                    </ul>

                    <div className="col-span-2">
                        <div className="w-30 h-30 rounded-full relative">
                            <img src={mypic} alt="" className="rounded-full" />
                            <RiEditBoxFill className="absolute right-1.5 bottom-1.5 text-3xl cursor-pointer" />
                        </div>

                        <div className="flex justify-between mt-5">
                            <label htmlFor="firstName">
                                <span className="font-bold">First Name</span>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    id="firstName" 
                                    placeholder="John" 
                                    className="
                                        p-2 
                                        mt-1
                                        flex
                                        w-[20vw]
                                        border 
                                        rounded-2xl
                                        border-gray-400 
                                    " 
                                />
                            </label>

                            <label className="" htmlFor="lastName">
                                <span className="font-bold">Last Name</span>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    id="lastName" 
                                    placeholder="Doe" 
                                    className="
                                        p-2 
                                        mt-1
                                        flex
                                        w-[20vw]
                                        border 
                                        mb-5
                                        rounded-2xl
                                        border-gray-400 
                                    " 
                                />
                            </label>
                        </div>

                        <label htmlFor="mobile" className="w-full">
                            <span className="font-bold">Phone</span>
                            <input 
                                type="text" 
                                name="mobile" 
                                id="mobile" 
                                placeholder="Enter your mobile number" 
                                className="
                                    p-2 
                                    mt-1
                                    flex
                                    w-full
                                    border 
                                    mb-5
                                    rounded-2xl
                                    border-gray-400 
                                " 
                            />
                        </label>

                        <label htmlFor="email" className="w-full">
                            <span className="font-bold">Email</span>
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                placeholder="Enter your email address" 
                                className="
                                    p-2 
                                    mt-1
                                    flex
                                    w-full
                                    border 
                                    mb-5
                                    rounded-2xl
                                    border-gray-400 
                                " 
                            />
                        </label>

                        <label htmlFor="gender">
                            <span className="font-bold">Gender</span>
                            <select 
                                id="gender"
                                name="gender" 
                                className="
                                    p-2 
                                    mt-1
                                    flex
                                    w-full
                                    border 
                                    mb-5
                                    outline-none
                                    rounded-2xl
                                    pr-50
                                    border-gray-400 
                                "
                            >
                                <option hidden selected disabled>Select Gender</option>

                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </label>

                        <button className="bg-[#121212] py-2 px-4 text-white rounded-2xl text-lg hover:scale-[1.02] cursor-pointer duration-200 transition-all">Update Changes</button>
                    </div>
                </main>
            <Footer />
        </div>
    )
}