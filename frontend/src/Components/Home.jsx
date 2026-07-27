import { Navbar } from "./Navbar"
import { Footer } from "./Footer.jsx"
import { MdArrowForward, MdOutlineShoppingBag } from "react-icons/md";
import { expData } from "../Data/ExploreCollectionData.js"
import { arrivals } from "../Data/NewArrivals.js"
import { sellerData } from "../Data/BestSellerData.js";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { useRef, useState } from "react";
import banner from "../Assets/desktop_banner.png"
import mobBanner from "../Assets/banner.png"
import { useNavigate } from "react-router-dom";

export function Home(props) {
    const swiperRef = useRef(null)
    const arrivalRef = useRef(null)
    const bestSellRef = useRef(null)

    const navigate = useNavigate()

    const [NewArrivals, setNewArrivals] = useState([])
    const [BestSellerData, setBestSellerData] = useState([])

    useState(() => {
        const loadData = async () => {
            const data1 = await arrivals()
            const data2 = await sellerData()

            setNewArrivals(data1)
            setBestSellerData(data2)
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
        <>
            <Navbar cartLength={props.cartLength} />

            {/* Discover Collection */}
            <div className="w-full h-210 relative">
                <img src="https://images.only.com/15363431/4905280/003/only-jdyhazenshineshortjacketotwyfm-grey.jpg?v=b62e7b5631e58388f797a053bff81653&format=auto&width=1720&quality=90&key=productTile_fullScreen-WIDESCREEN&bg-color=%23f5f5f5&dpr=1" className="object-cover h-full w-full sm:hidden" />

                <img src="https://www.halfdays.com/cdn/shop/files/Halfdays_Summer_._2026_Matcha_16_2.png?v=1780407011&width=2000" className="object-cover h-full w-full hidden sm:block" />

                <div className="absolute left-1/2 bottom-3 lg:bottom-10 -translate-x-1/2 text-center">
                    <h4 className="text-2xl lg:text-5xl text-white mb-5 font-bold">New Arrivals</h4>

                    <div className="bg-gray-200 hover:bg-[#e7ddbb] flex justify-center items-center gap-2 cursor-pointer p-2">
                        <p onClick={() => navigate('/collections')} className="lg:text-2xl font-oswald hover:bg-[#e7ddbb]">DISCOVER THE COLLECTION</p>
                        <MdArrowForward />
                    </div>
                    
                </div>
            </div>
            
            {/* Explore Collections */}
            <div className="mt-10 pt-5 px-2 md:px-5 lg:px-20">
                <h1 className="text-3xl font-semibold">Explore Collections</h1>

                <div className="mt-6 relative">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        loop={true}
                        slidesPerView={4}
                        spaceBetween={20}
                        breakpoints={{
                            0: {slidesPerView: 1},
                            640: {slidesPerView: 2},
                            768: {slidesPerView: 3},
                            1024: {slidesPerView: 4}
                        }}
                        className="mySwiper"
                    >
                        {expData.map((ele) => (
                            <SwiperSlide key={ele.id}>
                                <div className="flex-1" onClick={() => navigate(`/collections?gender=${ele.title.split("'")[0].toLowerCase()}`)}>
                                    <div className="overflow-hidden">
                                        <img src={ele.url} alt={ele.alt} className="cursor-pointer hover:scale-105  object-cover w-full h-full transition-transform ease-in-out duration-300 max-h-140" />
                                    </div>
                                    <p className="mt-3">Shop</p>
                                    <p className="mt-1.5 text-[#060553] text-lg lg:text-2xl underline tracking-wider cursor-pointer">{ele.title}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button onClick={() => swiperRef.current?.slidePrev()} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#e7ddbb] p-4 cursor-pointer"><FaArrowLeft className="text-3xl" /></button>

                    <button onClick={() => swiperRef.current?.slideNext()} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#e7ddbb] p-4 cursor-pointer z-10"><FaArrowRight className="text-3xl" /></button>
                </div>
            </div>
            
            {/* Discover style text */}
            <div className="2xl:mt-10 pt-5 px-1.5 md:px-3 lg:px-15">
                <h1 className="font-bold text-3xl tracking-wider">Discover Your Signature Style</h1>
                <p className="mt-5 text-lg">Elevate your wardrobe with timeless pieces and contemporary trends designed to make every day feel effortlessly stylish.</p>
            </div>

            {/* New Arrivals */}
            <div className="my-10 pt-7 pb-7 px-2 md:px-5 lg:px-20">
                <h1 className="text-3xl font-semibold">New Arrivals</h1>
                <div className="mt-6 relative">
                    <Swiper
                        onSwiper={(swiper) => {
                            arrivalRef.current = swiper
                        }}
                        // loop={true}
                        slidesPerView={5}
                        spaceBetween={20}
                        breakpoints={{
                            0: {slidesPerView: 1},
                            481: {slidesPerView:2},
                            768: {slidesPerView: 3},
                            1024: {slidesPerView: 4},
                            1280: {slidesPerView: 5},
                        }}
                        className="mySwiper"
                    >
                        {NewArrivals.map((ele) => (
                            <SwiperSlide key={ele.id}>
                                <div className="flex-1" onClick={() => navigate(`/product/${createSlug(ele.title)}-${ele.id}`)}>
                                    <div className="overflow-hidden h-[35vh] sm:h-[45vh] relative">
                                        <img src={ele.thumbnail} alt={ele.title} className="cursor-pointer hover:scale-105  object-contain w-full h-full transition-transform ease-in-out duration-300 bg-white" />
                                        <MdOutlineShoppingBag className="absolute bottom-3 right-3 text-3xl bg-white p-1 rounded-full cursor-pointer" />
                                    </div>
                                    {
                                    ele.offer ? 
                                        <div className="py-1.5"><p className="bg-[#bbe7e7] inline py-2 px-5">{ele.offer}% off</p></div> 
                                        :
                                        <div className="py-1.5"><p className="bg-[#e7ddbb] inline py-2 px-5">Just In</p></div>
                                    }
                                    <p className="mt-1.5 text-sm lg:text-base truncate">{ele.title}</p>
                                    <p className="mt-1.5 text-sm lg:text-base text-[#5366a5]">Rs. {ele.price}.00</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button onClick={() => arrivalRef.current?.slidePrev()} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#e7ddbb] p-4 cursor-pointer"><FaArrowLeft className="text-3xl" /></button>

                    <button onClick={() => arrivalRef.current?.slideNext()} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#e7ddbb] p-4 cursor-pointer z-10"><FaArrowRight className="text-3xl" /></button>
                </div>
            </div>

            {/* Sale Banner */}
            <a href="#" className="cursor-pointer">
              <div className="relative">
                <img src={banner} alt="sale-banner" className="w-full hidden sm:block" />
                <img src={mobBanner} alt="sale-banner" className="w-full sm:hidden" />
                <span 
                    className="
                        px-3 
                        py-2 
                        absolute 
                        left-1/2 
                        bottom-1/9
                        sm:bottom-3 
                        lg:bottom-10 
                        -translate-x-1/2 
                        text-center 
                        text-black 
                        bg-white 
                        hover:bg-[#e7ddbb] 
                        text-base
                        sm:text-lg
                        rounded-sm
                    "
                >
                    DISCOVER MORE
                </span>
              </div>
            </a>

            {/* Best Sellers */}
            <div className="my-10 pt-10 px-2 md:px-5 lg:px-20">
                <h1 className="text-3xl font-semibold">Top 10 Best Sellers</h1>
                <div className="mt-6 relative">
                    <Swiper
                        onSwiper={(swiper) => {
                            bestSellRef.current=swiper
                        }}
                        spaceBetween={20}
                        slidesPerView={4}
                        breakpoints={{
                            0: {slidesPerView: 1},
                            481: {slidesPerView:2},
                            768: {slidesPerView: 3},
                            1024: {slidesPerView: 4},
                            1280: {slidesPerView: 5},
                        }}
                    >
                        {BestSellerData.map((ele) => (
                            <SwiperSlide key={ele.id}>
                                <div className="flex-1" onClick={() => navigate(`/product/${createSlug(ele.title)}-${ele.id}`)}>
                                    <div className="overflow-hidden h-[35vh] sm:h-[45vh] relative">
                                        <img src={ele.thumbnail} alt={ele.title} className="object-contain cursor-pointer hover:scale-105 w-full h-full transition-transform ease-in-out duration-300 bg-white" />
                                        <p className="absolute bottom-3 left-3 bg-white p-1 rounded-full cursor-pointer">{ele.id}</p>
                                        <MdOutlineShoppingBag className="absolute bottom-3 right-3 text-3xl bg-white p-1 rounded-full cursor-pointer" />
                                    </div>
                                    {
                                    ele.offer ? 
                                        <div className="py-1.5"><p className="bg-[#bbe7e7] inline py-2 px-5">{ele.offer}% off</p></div> 
                                        :
                                        <div className="py-1.5"><p className="bg-[#e7ddbb] inline py-2 px-5">Just In</p></div>
                                    }
                                    <p className="mt-1.5 text-sm lg:text-base truncate">{ele.title}</p>
                                    <p className="mt-1.5 text-sm lg:text-base text-[#5366a5]">Rs. {ele.price}.00</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button onClick={() => bestSellRef.current?.slidePrev()} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#e7ddbb] p-4 cursor-pointer"><FaArrowLeft className="text-3xl" /></button>

                    <button onClick={() => bestSellRef.current?.slideNext()} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#e7ddbb] p-4 cursor-pointer z-10"><FaArrowRight className="text-3xl" /></button>
                </div>
            </div>
        
            {/* Footer */}
            <Footer />
        </>
    )
}