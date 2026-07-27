import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { productCollectionData } from "../Data/productCollectionData.js";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GoDot } from "react-icons/go";

import { useNavigate } from "react-router-dom";


export function CartPage(props) {
    const navigate = useNavigate()
    const [cartProducts, setCartProducts] = useState([])

    const checkoutPrice = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    useEffect(() => {
        const loadCart = async () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || []
            const data = await productCollectionData()

            const products = cart.map(item => {
                const product = data.find(ele => ele.id === item.productId)

                return {
                    ...product,
                    quantity: item.quantity
                }
            })

            setCartProducts(products)
        }

        loadCart()
    }, [])

    const removeProduct = (productId) => {
        const updatedProducts = cartProducts.filter(
            item => item.id !== productId
        );

        setCartProducts(updatedProducts);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = cart.filter(
            item => item.id !== productId
        );

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };  

    const increaseQty = (productId) => {
        const updatedProducts = cartProducts.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        setCartProducts(updatedProducts);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = cart.map(item =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        props.setCartLength(prev => prev + 1)
    };

    const decreaseQty = (productId) => {
        const updatedProducts = cartProducts
            .map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        setCartProducts(updatedProducts);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = cart
            .map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        props.setCartLength(prev => prev - 1)
    };


    
    return (
        <div>
            <Navbar cartLength={props.cartLength} />

            <main className="px-3 sm:px-10 mt-15">
                <div className="border-b pb-10 mb-4.5 w-full flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl w-fit relative font-bold">
                        YOUR BAG
                        <span className="hidden sm:block font-normal absolute right-0 top-0 -mt-3.5 -mr-3.5 text-base sm:text-lg">{props.cartLength}</span>
                    </h1>

                    <a onClick={() => navigate('/home')} className="text-sm cursor-pointer underline">←Continue Shopping</a>
                </div>

                {
                    cartProducts.length > 0 
                    ?
                    <div className="md:flex justify-between">
                        <div className="md:w-[65%]">
                            {cartProducts.map((item) => (
                            <div key={item.id} className="md:flex justify-between items-center border-b border-gray-300 py-7.5">
                                <div className="flex">
                                    <div className="bg-white rounded w-45 md:h-60 flex justify-center items-center">
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain " />
                                    </div>

                                    <div className="px-5 md:py-3">
                                        <h6 className="font-semibold">{item.title}</h6>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                            <span>Black</span>
                                            <GoDot className="text-xs" />
                                            <span>XL</span>
                                        </div>

                                        <p className="text-lg font-semibold mt-2">
                                            ₹{(item.price)}
                                        </p>

                                        <div className="flex items-center justify-between mt-2 md:mt-4">
                                            <div className="flex items-center border rounded-md px-2 py-1">
                                                <AiOutlineMinus 
                                                    className="cursor-pointer"
                                                    onClick={() => decreaseQty(item.id)}
                                                />
                                                <span  
                                                    className="mx-3"
                                                >
                                                    {item.quantity}
                                                </span>
                                                <AiOutlinePlus onClick={() => increaseQty(item.id)} className="cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => removeProduct(item.id)} 
                                    className="text-sm underline cursor-pointer text-black"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        </div>

                        <div className="md:w-[30%] md:sticky top-5 h-fit p-6 border border-gray-300 shadow-md mt-3 md:mt-0 rounded-md">
                            <h1 className="text-lg font-semibold mb-3">Order Summary</h1>

                            <hr className="my-2 text-gray-400" />

                            <div>
                                {cartProducts.length > 0 && 
                                cartProducts.map((item, idx) => (
                                    <div key={item.id} className="mb-1 flex justify-between">
                                        <p className="py-1 flex mr-2">
                                            <span>{idx+1}.{"\u00A0"}</span> <span>{item.title} ({item.quantity} items)</span>
                                        </p>
                                        <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>   
                                ))}
                            </div>

                            <hr className="my-2 text-gray-400" />

                            <div className="flex justify-between">
                                <p>Total :</p>
                                <p className="font-bold">₹{checkoutPrice.toFixed(2)}</p>
                            </div>

                            <div className="w-full flex justify-center">
                                <button className="mt-6 bg-black cursor-pointer hover:scale-[1.02] transition-all duration-300 text-white px-6 py-3">Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center py-20">
                        <h2 className="text-2xl font-semibold">
                            Your Bag Is Empty
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Looks like you haven't added any products yet.
                        </p>

                        <button
                            onClick={() => navigate('/home')}
                            className="mt-6 bg-black cursor-pointer hover:scale-[1.02] transition-all duration-300 text-white px-6 py-3"
                        >
                            CONTINUE SHOPPING
                        </button>
                    </div>
                }
            </main>

            <Footer />
        </div>
    )
}