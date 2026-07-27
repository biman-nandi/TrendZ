import { useParams } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { productData } from "../Data/productData.js"
import { pinLocation } from "../Data/Location.js"
import { ProductPageSkeleton } from "./ProductPageSkeleton.jsx";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { 
    MdFavoriteBorder, 
    MdOutlineShoppingBag, 
    MdOutlineDeliveryDining, 
    MdOutlinePayments 
} from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { RxFileText } from "react-icons/rx";
import { 
    RiFileList3Line ,
    RiExchangeLine
} from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";

import { Navigation, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { ToastContainer, toast } from 'react-toastify';
import { formatedPrice } from "../utils/FormatedPrice.js";
import { colorMap } from "../utils/colorMap.js";




export function ProductPage(props) {
    const navigation = useNavigate()


    const { slug } = useParams();
    const prodId = slug.split("-").pop()
    const [product, setProduct] = useState(null)
    const [imgOpen, setImgOpen] = useState(false)
    const [pin, setPin] = useState("")
    const [country, setCountry] = useState(null)
    const [buttonClicked, setButtonClicked] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    
    
    useEffect(() => {
        const loadData = async () => {
            const prod = await productData(Number(prodId))            
            setProduct(prod)
            setSelectedProduct(prod?.variants?.[0])
        }
        
        loadData()
    }, [prodId])

    console.log(selectedProduct)

    const getCurrentData = (attrName) => {
        const attrValue = selectedProduct?.attributes.find(item => item.attribute_name === attrName)
        return attrValue.attribute_value
    }

    

    const attributeGroups = {}
    if (product) {
        product.variants.forEach((variant) => {
            variant.attributes.forEach((attr) => {
                if (!attributeGroups[attr.attribute_name]) {
                    attributeGroups[attr.attribute_name] = []
                }

                const alreadyExists = attributeGroups[attr.attribute_name].find(item => {
                    return item.value === attr.attribute_value
                })

                if (!alreadyExists) {
                    attributeGroups[attr.attribute_name].push({
                        value: attr.attribute_value,
                        variant
                    })
                }
            })
        })
    }


    const fetchLocation = async () => {
        try {
            const result = await pinLocation(pin)

            if (!result) {
                toast.error("Enter a valid PIN")
                return;
            }

            setCountry(result[0].PostOffice[0].Country)
        } catch (error) {
            toast.error("Enter a valid PIN")
            return;
        }
    }

    const getDeliveryDate = () => {
        const date = new Date()
        date.setDate(date.getDate() + 10)

        return date
            .toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            })        
    }


    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || []
        const existingProduct = cart.find(item => item.productId === product.id)

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                productId: product.id,
                quantity: 1
            })
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        props.setCartLength(prev => prev + 1)
        setButtonClicked("cart")
    }
    


    return (
        <div className="relative">
            <Navbar cartLength={props.cartLength} />
            
            {
                product ?
                <div>
                    <main className="md:flex gap-8 px-3 sm:px-10 mt-5 md;mt-15">

                        {/* Mobile screen Images */}
                        <div 
                            className="
                                flex
                                justify-center
                                items-center
                                bg-white
                                md:hidden
                            "
                        >
                            <Swiper
                                modules={[Navigation, Pagination]}
                                slidesPerView={1}
                                navigation
                                pagination={{clickable: false}}
                                loop={true}
                                className="w-full aspect-square"
                            >
                                {selectedProduct?.images?.map(img => (
                                    <SwiperSlide 
                                        key={img.image_url}
                                        className="p-5"
                                    >
                                        <img src={img.image_url} alt={img.image_url} className="w-full h-full object-contain"/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        {/* Big screen Images */}
                        <div className="hidden md:grid grid-cols-2 w-full md:w-[60%] md:sticky top-5 h-fit gap-5">
                            {selectedProduct?.images?.slice(0,5).map((img, idx) => (
                                <div key={img.image_url} className="h-75 lg:h-100 w-full relative">
                                    <img src={img.image_url} alt={img.image_url} onClick={() => setImgOpen(true)} className="bg-white cursor-pointer h-full w-full object-contain rounded p-2" />

                                    <div className={`${idx < 4 && "hidden"} absolute inset-0 text-2xl flex justify-center items-center bg-black/50 rounded text-white font-bold cursor-pointer`} onClick={() => setImgOpen(true)}>
                                        +{selectedProduct?.images?.length - 4}
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Image Open Section */}
                        {
                            imgOpen && 
                            <div 
                                className="
                                    fixed
                                    py-20
                                    inset-0
                                    z-50
                                    flex
                                    justify-center
                                    items-center
                                    bg-white
                                "
                            >
                                <IoMdCloseCircleOutline 
                                    onClick={() => setImgOpen(false)}
                                    className="text-2xl absolute right-10 top-10 cursor-pointer z-50"
                                />

                                <Swiper
                                    modules={[Navigation, Keyboard, Pagination]}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{clickable: false}}
                                    keyboard={{ enabled: true, onlyInViewport: true }}
                                    loop={true}
                                    className="w-full h-full"
                                >
                                    {selectedProduct?.images?.map(img => (
                                        <SwiperSlide key={img.image_url}>
                                            <div className="flex justify-center items-center h-full">
                                                <img src={img.image_url} alt={img.image_url} className="w-full h-full object-contain"/>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>                     
                        }


                        {/* Product Section */}
                        <div className="
                            mt-10
                            md:mt-0
                            w-full
                            md:w-[40%]"
                        >
                            {/* Brand */}
                            <h1 className="text-2xl font-bold tracking-wider">
                                {product.brand}
                            </h1>



                            {/* Title */}
                            <h3 className="text-gray-500 tracking-wider text-xl">
                                {product.title}
                            </h3>



                            {/* Rating */}
                            <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-baseline w-fit mt-5">
                                <span className="font-bold">
                                    {product.rating_average}
                                </span>

                                <FaStar className="text-green-700 ml-1" />

                                <span 
                                    className="text-gray-500">{'\u00A0'}
                                    <span 
                                        className="text-xl">|
                                    </span>
                                    {'\u00A0'}{product.rating_count} Ratings
                                </span>
                            </div>



                            {/* Product Attriutes */}
                            {Object.entries(attributeGroups).map(([name, values]) => (
                                <div key={name} className="my-4">
                                    <p className="text-gray-800 my-2">
                                            <span className=" text-gray-600 font-bold">
                                                {name}:{'\u00A0'}
                                            </span> 
                                            {getCurrentData(name)}
                                        </p>

                                    <div className="flex gap-2">
                                        {values.map(({value, variant}) => (
                                            (!name.includes("Color") ? 
                                                <button
                                                key={value}
                                                onClick={() => setSelectedProduct(variant)}
                                                className={`border px-3 py-1 rounded-2xl cursor-pointer ${getCurrentData(name) === value && "border-2 border-gray-500"}`}
                                            >
                                                {value}
                                            </button> :
                                            <div key={value} className="flex w-fit gap-2 h-10">
                                                    <button
                                                        onClick={() => setSelectedProduct(variant)}
                                                        style={{
                                                            backgroundColor: colorMap[value]
                                                        }}
                                                        className={`
                                                            w-10
                                                            h-10
                                                            rounded-full
                                                            ml-3
                                                            cursor-pointer
                                                            ${
                                                                selectedProduct.id === variant.id
                                                                    ? "ring-2 ring-offset-2 ring-black"
                                                                    : ""
                                                            }
                                                        `}
                                                    />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))}



                            {/* Price */}
                            <div className="mt-5 flex items-center gap-2 sm:gap-3.5">
                                <span className="font-bold text-lg lg:text-2xl">
                                    {formatedPrice(Math.floor(selectedProduct.price))}
                                </span>

                                <span className="text-gray-500 text-base lg:text-xl">
                                    MRP <span className="line-through">
                                        {formatedPrice(Math.floor((Number(selectedProduct.discount_percentage) + 100)/100  * selectedProduct.price))}
                                    </span>
                                </span>

                                <span className="text-green-600 font-semibold inline text-base lg:text-xl">
                                    ({Math.floor(selectedProduct.discount_percentage)}% OFF)
                                </span>
                            </div>



                            {/* Add to Cart & Wishlist btn */}
                            <div className="flex gap-3 mt-5 mb-7 font-semibold">
                                <button onClick={buttonClicked !== "cart" && addToCart} className="w-[50%] flex justify-center items-center gap-2 bg-[#121212] text-white text-xs sm:text-base hover:bg-gray-400 hover:text-black cursor-pointer rounded-sm transition-all duration-300 hover:scale-[1.02]">
                                    < MdOutlineShoppingBag /> {buttonClicked !== "cart" ? "ADD TO CART" : <span onClick={() => navigation('/cart')}>GO TO CART</span>}
                                </button>

                                <button className="border border-gray-300 hover:border-black cursor-pointer px-2 py-3 w-[50%] flex justify-center items-center gap-1.5 text-xs sm:text-base rounded-sm transition-all duration-300 hover:scale-[1.02]">
                                    <MdFavoriteBorder className="sm:text-xl"/> WISHLIST
                                </button>
                            </div>



                            <hr 
                                className="
                                    mt-5 
                                    text-gray-400
                                " 
                            />
                            {/* Description */}
                            <p className="mt-5 text-lg tracking-tight mb-3 text-gray-600">
                                {product.description}
                            </p>


                            
                            {/* Delivery Options  */}
                            <div className="border-t border-t-gray-400 
                                py-5
                            ">
                                <h1 className="font-semibold">Delivery Options <TbTruckDelivery className="inline text-lg ml-1" /></h1>
                                
                                <div className="mt-3 py-2 px-3 border border-gray-400 rounded-lg min-w-45 w-2/3 sm:w-1/2 lg:w-1/3 flex justify-between items-center gap-2">
                                    <input 
                                        type="number" 
                                        name="pin" 
                                        id="pin" 
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        placeholder="Enter pincode" 
                                        className="flex-1 min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none" 
                                    />
                                    {country === "India" && <TiTickOutline className="bg-green-700 text-white rounded-full text-lg shrink-0" />}
                                    {
                                        !country &&
                                        <button onClick={fetchLocation} className="text-[#121212] text-sm sm:text-sm font-semibold cursor-pointer w-fit">Check</button>
                                    }

                                    {
                                        country &&
                                        <button onClick={() => setCountry(null)} onClick={() => {setCountry(null); setPin("");}} className="text-[#121212] text-sm sm:text-sm font-semibold cursor-pointer w-fit ">Change</button>
                                    }
                                </div>

                                {country === "India" ? 
                                    <ul className="space-y-4 mt-5 font-semibold text-gray-600">
                                        <li className="flex items-center">
                                            <MdOutlineDeliveryDining className="inline text-3xl mr-2" />
                                            <span>{product.shipping_information}</span>
                                        </li>
                                        <li className="flex items-center">
                                            <MdOutlinePayments className="inline text-3xl mr-2" />
                                            <span>Pay on delivery available</span>
                                        </li>
                                        <li className="flex items-center">
                                            <RiExchangeLine className="inline text-3xl mr-2" />
                                            <span>{product.return_policy}</span>
                                        </li>
                                    </ul> : 
                                    <ul className="space-y-4 mt-5 font-semibold text-gray-400">
                                        <li className="flex items-center">
                                            <MdOutlineDeliveryDining className="inline text-3xl mr-2" />
                                            <span>Free Delivery</span>
                                        </li>
                                        <li className="flex items-center">
                                            <MdOutlinePayments className="inline text-3xl mr-2" />
                                            <span>Cash on Delivery</span>
                                        </li>
                                        <li className="flex items-center">
                                            <RiExchangeLine className="inline text-3xl mr-2" />
                                            <span>7 Day Return</span>
                                        </li>
                                    </ul>
                                }
                            </div>



                            {/* Product Highlights */}
                            <div className="border-t border-t-gray-400 
                                py-5
                            ">
                                <h1 className="font-semibold flex items-center">Product Highlights<RiFileList3Line className="inline ml-1" /></h1>

                                <ul className="mt-3 space-y-2 text-gray-700">
                                    {product.highlights?.map((item, idx) => (
                                        <li key={idx} className="flex gap-2"><div>✓</div> {item}</li>
                                    ))}

                                    {product.warranty_information && (
                                        <li className="flex gap-2"><div>✓</div> {product.warranty_information}</li>
                                    )}
                                </ul>
                            </div>



                            {/* Specifications */}
                            <div className="border-t border-t-gray-400 pt-5">
                                <h1 className="font-semibold">Specifications<AiOutlineProduct className="inline ml-1" /></h1>

                                {selectedProduct?.specifications?.map((item, idx) => (
                                    <div key={item.label} className={`mt-3 pb-3 ${idx !== selectedProduct.specifications.length-1 && "border-b"} border-gray-300 flex justify-between`}>
                                        <span className="text-gray-600">{item.label}</span>
                                        <span>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            

                            {/* Customer Reviews  */}
                            {/* <div className="mt-5 border-t border-t-gray-400 
                                border-b border-b-gray-400 pt-8 pb-5
                            ">
                                <h1 className="font-semibold">Customer Reviews ({product.reviews.length})</h1>

                                {product.reviews.map((item, idx) => (
                                    <div key={idx} 
                                        className={`${idx !== product.reviews.length-1 ? `border-b` : 'border-0'}  border-b-gray-300 my-1 flex gap-5 py-2`}
                                    >
                                    <div className={`flex items-baseline w-fit ${item.rating < 3 ? "bg-red-700" : "bg-green-700"} text-white px-1 h-fit`}>
                                        <span className="text-sm">{item.rating}</span>
                                        <FaStar className="text-white text-xs ml-0.5" />
                                    </div>

                                        <div>
                                            <span>{item.comment}</span>

                                            <div className="text-gray-600">
                                                <span>{item.reviewerName}</span>
                                                <span> | </span>
                                                <span>{item.reviewerEmail}</span>
                                                <span> | </span>
                                                <span>{new Date(item.date).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div> */}
                        </div>
                    </main>
                </div> :
                <ProductPageSkeleton />
            }
            <Footer />
        </div>
    )
}