import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { productCollectionData } from "../Data/productCollectionData.js";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function Wishlist(props) {
    const navigate = useNavigate()
    
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            const data = await productCollectionData();   
            setProduct(data)
        }
        
        loadData()
    }, [])

    const createSlug = (title) => {
        return title
                .toLowerCase()
                .replaceAll(" ", "-")
                .replace(/[^\w-]+/g, "");
    }
    
    return (
        <div>
            <Navbar cartLength={props.cartLength} />

            {
                product && (
                    <main className="px-3 sm:px-10 mt-15">
                    <h1 className="font-bold text-lg">
                        My WishList <span className="font-normal ml-2">{product.length} items</span>
                    </h1>

                    {
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-5">
                            {product.map((ele) => (
                                <div key={ele.id} className="shadow-md hover:scale-[1.02] transition-all duration-300" onClick={() => navigate(`/product/${createSlug(ele.title)}-${ele.id}`)}>

                                    {/* Image */}
                                    <div className="bg-gray-300 aspect-4/5 relative">
                                        <img src={ele.thumbnail} alt={ele.title} className="w-full h-full object-contain" />

                                        <IoMdCloseCircleOutline className="absolute right-2 top-2 z-50 text-lg" />
                                    </div>

                                    {/* Title */}
                                    <div className="p-2.5 flex flex-col">
                                        <p className="truncate text-center">{ele.title}</p>

                                        <div className="flex items-center justify-center gap-2 lg:gap-2 mt-1">
                                            <span className="font-semibold">₹{Math.floor(ele.price*94.43)}</span>

                                            <span className="text-gray-500 line-through text-sm">₹{Math.floor((ele.discountPercentage + 100)/100 * ele.price * 94.43)}</span>
                                            <span className="text-orange-400 inline text-sm">({Math.floor(ele.discountPercentage)}% OFF)</span>
                                        </div>
                                    </div>

                                    <button className="w-full font-black border border-gray-300 p-2 hover:text-gray-600 hover:border-gray-400 cursor-pointer">ADD TO CART</button>
                                </div>
                            ))}
                        </div>
                    }
                </main>
                )
            }
            <Footer />
        </div>
    )
}