import { Navbar } from "./Navbar.jsx"
import { Footer } from "./Footer.jsx"
import { productCollectionData } from "../Data/productCollectionData.js"
import { useEffect, useState } from "react"
import { IoChevronDown } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { formatedPrice } from "../utils/FormatedPrice.js";

import { useSearchParams } from "react-router-dom";



export function CollectionsPage(props) {
    const [activeFilter, setActiveFilter] = useState(null);
    const [filters, setFilters] = useState({
        gender: [],
        category: [],
        brand: [],
        size: [],
        color: [],
        sort: "Recommended"
    })
    const [products, setProducts] = useState([])

    const [searchParams] = useSearchParams()
    const genderParams = searchParams.get("gender")

    useEffect(() => {
        const loadData = async () => {
            const data = await productCollectionData(genderParams)
            setProducts(data)
        }

        loadData()
    }, [])

    const gender = false && [...new Set(products.map((product) => product.gender))]

    const category = [...new Set(products.map((product) => product.category))]

    const brand = [...new Set(products.map((product) => product.brand))]

    const size = false && [...new Set(products.map((product) => product.size))]

    const color = false && [...new Set(products.map((product) => product.color))]

    const sort = [
        "Recommended",
        "Whats' New",
        "Popularity",
        "Better Discount",
        "Price: Hight to Low",
        "Price: Low to High",
        "Customer Rating"
    ]

    useEffect(() => {
        const handleGlobalClick = () => {
            setActiveFilter(null)
        }

        window.addEventListener('click', handleGlobalClick)

        return () => window.removeEventListener('click', handleGlobalClick)
    }, [])


    const toogleFilter = (type, value) => {
        setFilters((prev) => {
            return {
                ...prev,
                [type]: prev[type].includes(value) ? prev[type].filter(item => item !== value) : [...prev[type], value]
            }
        })
    }

    const handleSortChange = (value) => {
        setFilters(prev => ({
            ...prev,
            sort: value
        }));
    };

    const filteredProducts = products
    .filter(product => {
        return Object.entries(filters).every(([type, value]) => {
            if (!Array.isArray(value)) return true;
            if (value.length === 0) return true;

            return value.includes(product[type]);
        });
    })
    .sort((a, b) => {
        switch (filters.sort) {
            case "Price: Low to High":
                return a.price - b.price;

            case "Price: Hight to Low":
                return b.price - a.price;

            case "Customer Rating":
                return b.rating - a.rating;

            case "Better Discount":
                return b.discountPercentage - a.discountPercentage;

            case "Recommanded":
                return;

            case "Popularity":
                return b.stock - a.stock
            
            case "Whats' New":
                return (
                    new Date(b.meta.createdAt) -
                    new Date(a.meta.createdAt)
                ); 

            default:
                return 0;
        }
    });


    // Go to Product Page
    const navigate = useNavigate()

    const createSlug = (title) => {
        return title
                .toLowerCase()
                .replaceAll(" ", "-")
                .replace(/[^\w-]+/g, "");
    }



    return (
        <div>
            <Navbar cartLength={props.cartLength} />

            <main className="px-3 sm:px-10 mt-15">
                <p className="uppercase mb-2 text-xs tracking-widest">Home / {genderParams}</p>

                <h1 className="uppercase mb-15 text-4xl font-bold">{genderParams}</h1>

                <div className="flex justify-between items-center">
                    {/* Mobile */}
                    <div className="sm:hidden">
                        <button 
                            // onClick={renderFilter}
                            className="border px-4 py-3"
                        >
                            Filters
                            <IoChevronDown className={`ml-1 inline transition-transform duration-300`} />
                        </button>
                    </div>

                    {/* Desktop */}
                    <div 
                        className="hidden sm:flex gap-4"
                    >
                        {
                            gender.length > 1 && 
                            <div 
                                className="relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveFilter(activeFilter === "gender" ? null : "gender")}
                                    className="border px-4 py-3"
                                >
                                    Gender
                                    <IoChevronDown className={`ml-1 inline transition-transform duration-300 ${activeFilter === "gender" ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                {activeFilter === "gender" && 
                                    <div className="border flex bg-white p-4 mt-2 flex-col absolute left-0 z-50 h-41 overflow-y-auto">
                                        {gender.map(ele => (
                                            <label key={ele} className="flex items-center my-1">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={() => toogleFilter("gender", ele)}
                                                    checked={filters.gender.includes(ele)}
                                                    className="appearance-none w-4 h-4 border checked:bg-black cursor-pointer" 
                                                />
                                                <p className="tracking-tighter pl-2 cursor-pointer">{ele}</p>
                                            </label>
                                        ))}
                                    </div>
                                }
                            </div>
                        }

                        {/* Category */}
                        {
                            category.length > 1 &&
                            <div 
                                className="relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveFilter(activeFilter === "category" ? null : "category")}
                                    className="border px-4 py-3"
                                >
                                    Category
                                    <IoChevronDown className={`ml-1 inline transition-transform duration-300 ${activeFilter === "category" ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                {activeFilter === "category" && 
                                    <div className="border flex bg-white p-4 mt-2 flex-col absolute left-0 z-50 max-h-70 overflow-y-auto">
                                        {category.map(ele => (
                                            <label key={ele} className="flex items-center my-1">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={() => toogleFilter("category", ele)}
                                                    checked={filters.category.includes(ele)}
                                                    className="appearance-none w-4 h-4 border checked:bg-black cursor-pointer" 
                                                />
                                                <p className="tracking-tighter pl-2 cursor-pointer whitespace-nowrap">{ele}</p>
                                            </label>
                                        ))}
                                    </div>
                                }
                            </div>
                        }

                        {/* Brand */}
                        {
                            brand.length > 1 && 
                            <div 
                                className="relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveFilter(activeFilter === "brand" ? null : "brand")}
                                    className="border px-4 py-3"
                                >
                                    Brand
                                    <IoChevronDown className={`ml-1 inline transition-transform duration-300 ${activeFilter === "brand" ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                {activeFilter === "brand" && 
                                    <div className="border flex bg-white p-4 mt-2 flex-col absolute left-0 z-50 max-h-70 overflow-y-auto">
                                        {brand.map(ele => (
                                            <label key={ele} className="flex items-center my-1">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={() => toogleFilter("brand", ele)}
                                                    checked={filters.brand.includes(ele)} 
                                                    className="appearance-none w-4 h-4 border checked:bg-black cursor-pointer" 
                                                />
                                                <p className="tracking-tighter pl-2 cursor-pointer whitespace-nowrap">{ele}</p>
                                            </label>
                                        ))}
                                    </div>
                                }
                            </div>
                        }

                        {/* Size */}
                        {
                            size.length > 1 &&
                            <div 
                                className="relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveFilter(activeFilter === "size" ? null : "size")}
                                    className="border px-4 py-3"
                                >
                                    Size
                                    <IoChevronDown className={`ml-1 inline transition-transform duration-300 ${activeFilter === "size" ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                {activeFilter === "size" && 
                                    <div className="border flex bg-white p-4 mt-2 flex-col absolute left-0 z-50">
                                        {size.map(ele => (
                                            <label key={ele} className="flex items-center my-1">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={() => toogleFilter("size", ele)}
                                                    checked={filters.size.includes(ele)}
                                                    className="appearance-none w-4 h-4 border checked:bg-black cursor-pointer" 
                                                />
                                                <p className="tracking-tighter pl-2 cursor-pointer whitespace-nowrap">{ele}</p>
                                            </label>
                                        ))}
                                    </div>
                                }
                            </div>
                        }

                        {
                            color.length > 1 && 
                            <div 
                                className="relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveFilter(activeFilter === "color" ? null : "color")}
                                    className="border px-4 py-3"
                                >
                                    Color
                                    <IoChevronDown className={`ml-1 inline transition-transform duration-300 ${activeFilter === "color" ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                {activeFilter === "color" && 
                                    <div className="border flex bg-white p-4 mt-2 flex-col absolute left-0 z-50">
                                        {color.map(ele => (
                                            <label key={ele} className="flex items-center my-1">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={() => toogleFilter("color", ele)}
                                                    checked={filters.color.includes(ele)}
                                                    className="appearance-none w-4 h-4 border checked:bg-black cursor-pointer" 
                                                />
                                                <p className="tracking-tighter pl-2 cursor-pointer whitespace-nowrap">{ele}</p>
                                            </label>
                                        ))}
                                    </div>
                                }
                            </div>
                        }

                    </div>

                    <div 
                        className="relative items-end group"
                    >
                        <button 
                            className="border px-4 py-3"
                        >
                            Sort By
                            <IoChevronDown className={`ml-1 inline transition-transform duration-300`} />
                        </button>


                        {/* Sort By */}
                        <div className="hidden border group-hover:flex bg-white p-4 mt-2 flex-col absolute right-0 z-50">
                            {sort.map(ele => (
                                <label key={ele} className="flex items-center my-1">
                                    <input 
                                        type="radio" 
                                        checked={filters.sort === ele}
                                        onChange={() => handleSortChange(ele)} 
                                        className="appearance-none w-4 h-4 border checked:bg-black cursor-pointer" 
                                    />
                                    <p className="tracking-tighter pl-2 cursor-pointer whitespace-nowrap">{ele}</p>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex gap-2">
                    {
                        Object.entries(filters).map(([key, value]) => {
                            if (!Array.isArray(value))  return null;

                            return value.map(item => (
                                <p key={`${key}-${item}`} className="bg-black text-white p-1">{item}<RxCross2 onClick={(() => toogleFilter(key, item))} className="inline" /></p>
                            ))
                        })
                    }
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10">
                    {filteredProducts.map((ele) => (
                        <div 
                            key={ele.id} 
                            className="mb-5 cursor-pointer" 
                            onClick={() => navigate(`/product/${createSlug(ele.title)}-${ele.id}`)}
                        >
                            <div className="aspect-3/4 overflow-hidden relative">
                                <img src={ele.thumbnail} alt={ele.title} className="h-full w-full object-contain bg-white" />
                                
                                <div className="flex items-baseline bg-gray-200 shadow-sm px-2 py-1 rounded-sm absolute z-50 bottom-2 left-2">
                                    <p className="text-black">{ele.rating_average}</p>
                                    <FaStar className="text-green-700 ml-0.5" />
                                    <p>&nbsp; | &nbsp;{ele.rating_count}</p>
                                </div>
                            </div>


                            <div className="p-3">
                                <p className="font-semibold text-sm">{ele.brand}</p>

                                <p className="truncate text-sm text-gray-600">{ele.title}</p>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="font-semibold text-sm">{formatedPrice(Math.floor(ele.price))}</span>

                                    <span className="text-gray-500 line-through text-xs">{formatedPrice(Math.floor((Number(ele.discount_percentage) + 100)/100  * ele.price))}</span>
                                    <span className="text-orange-400 inline ml-2 text-xs">{Math.floor(ele.discount_percentage)}% OFF</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}