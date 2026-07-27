import { IoSearchSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { handleLogOut } from "../utils/logout.js"



export function Navbar(props) {
    // const headerData = ["MEN", "WOMEN", "KIDS", "ACCESSORIES", "BLOGS"]
    const menuData = [
        {
            title: "MEN",
            section1: [
                {
                    heading: "Topwear",
                    items: [
                    "T-Shirts",
                    "Casual Shirts",
                    "Formal Shirts",
                    "Sweatshirts",
                    "Sweaters",
                    "Jackets",
                    "Blazers & Coats",
                    "Suits",
                    "Rain Jackets"
                    ]
                },

                {
                    heading: "Indian & Festive Wear",
                    items: [
                    "Kurtas & Kurta Sets",
                    "Sherwanis",
                    "Nehru Jackets",
                    "Dhotis"
                    ]
                },
            ],
            section2: [
                {
                    heading: "Bottomwear",
                    items: [
                    "Jeans",
                    "Casual Trousers",
                    "Formal Trousers",
                    "Shorts",
                    "Track Pants & Joggers",
                    ]
                },

                {
                    heading: "Innerwear & Sleepwear",
                    items: [
                    "Briefs & Trunks",
                    "Boxers",
                    "Vests",
                    "Sleepwear & Loungewear",
                    "Thermals",
                    ]
                },

                {
                    heading: "Plus Size",
                    items: [
                    ]
                },
            ],
            section3: [
                {
                    heading: "Footwear",
                    items: [
                    "Casual Shoes",
                    "Sports Shoes",
                    "Formal Shoes",
                    "Sneakers",
                    "Sandals & Floaters",
                    "Flip Flops",
                    "Socks"
                    ]
                },
                {
                    heading: "Personal Care & Grooming",
                    items: [
                    ]
                },
                {
                    heading: "Sunglasses & Frames",
                    items: [
                    ]
                },
                {
                    heading: "Watches",
                    items: [
                    ]
                },
            ],
            section4: [
                {
                    heading: "Sports & Active Wear",
                    items: [
                    "Sports Shoes",
                    "Sports Sandals",
                    "Active T-Shirts",
                    "Track Pants & Shorts",
                    "Tracksuits",
                    "Jackets & Sweatshirts",
                    "Sports Accessories",
                    "Swimwear",
                    ]
                },
                {
                    heading: "Gadgets",
                    items: [
                    "Smart Wearables",
                    "Fitness Gadgets",
                    "Headphones",
                    "Speakers",
                    ]
                },
            ],
            section5: [
                {
                    heading: "Fashion Accessories",
                    items: [
                    "Wallets",
                    "Belts",
                    "Perfumes & Body Mists",
                    "Trimmers",
                    "Deodorants",
                    "Ties, Cufflinks & Pocket Squares",
                    "Accessory Gift Sets",
                    "Caps & Hats",
                    "Mufflers, Scarves & Gloves",
                    "Phone Cases",
                    "Rings & Wristwear",
                    "Helmets",
                    ]
                },
                {
                    heading: "Bags & Backpacks",
                    items: [
                    ]
                },
                {
                    heading: "Luggages & Trolleys",
                    items: [
                    ]
                },
            ]
        },

        {
            title: "WOMEN",
            section1: [
                {
                    heading: "Indian & Fusion Wear",
                    items: [
                    "Kurtas & Suits",
                    "Kurtis, Tunics & Tops",
                    "Sarees",
                    "Ethnic Wear",
                    "Leggings, Salwars & Churidars",
                    "Skirts & Palazzos",
                    "Dress Materials",
                    "Lehenga Cholis",
                    "Dupattas & Shawls",
                    "Jackets",
                    ]
                },
                {
                    heading: "Belts, Scarves & More",
                    items: [
                    ]
                },
                {
                    heading: "Watches & Wearables",
                    items: [
                    ]
                }
            ],
            section2: [
                {
                    heading: "Western Wear",
                    items: [
                        "Dresses",
                        "Tops",
                        "Tshirts",
                        "Jeans",
                        "Trousers & Capris",
                        "Shorts & Skirts",
                        "Co-ords",
                        "Playsuits",
                        "Jumpsuits",
                        "Shrugs",
                        "Sweaters & Sweatshirts",
                        "Jackets & Coats",
                        "Blazers & Waistcoats",
                    ]
                },
                {
                    heading: "Plus Size",
                    items: [
                        
                    ]
                }
            ],
            section3: [
                {
                    heading: "Maternity",
                    items: [
                    ]
                },
                {
                    heading: "Sunglasses & Frames",
                    items: [
                    ]
                },
                {
                    heading: "Footer",
                    items: [
                        "Flats",
                        "Casual Shoes",
                        "Heels",
                        "Boots",
                        "Sports Shoes & Floaters",
                    ]
                },
                {
                    heading: "Sports & Active Wear",
                    items: [
                        "Clothing",
                        "Footwear",
                        "Sports Accessories",
                        "Sports Equipment",
                    ]
                }
            ],
            section4: [
                {
                    heading: "Lingerie & Sleepwear",
                    items: [
                        "Bra",
                        "Briefs",
                        "Shapewear",
                        "Sleepwear & Loungewear",
                        "Swimwear",
                        "Camisoles & Thermals",
                    ]
                },
                {
                    heading: "Beauty & Personal Care",
                    items: [
                        "Makeup",
                        "Skincare",
                        "Premium Beauty",
                        "Lipsticks",
                        "Fragrances",
                    ]
                }
            ],
            section5: [
                {
                    heading: "Gadgets",
                    items: [
                        "Smart Wearables",
                        "Fitness Gadgets",
                        "Headphones",
                        "Speakers",
                    ]
                },
                {
                    heading: "Jewellery",
                    items: [
                        "Fashion Jewellery",
                        "Fine Jewellery",
                        "Earrings",
                    ]
                },
                {
                    heading: "Backpacks",
                    items: [
                    ]
                },
                {
                    heading: "Handbags, Bags & Wallets",
                    items: [
                    ]
                },
                {
                    heading: "Luggages & Trolleys",
                    items: [
                    ]
                },                
            ]
        },

        {
            title: "KIDS",
            section1: [
                {
                    heading: "Boys Clothing",
                    items: [
                        "T-Shirts",
                        "Shirts",
                        "Shorts",
                        "Jeans",
                        "Trousers",
                        "Clothing Sets",
                        "Ethnic Wear",
                        "Track Pants & Pyjamas",
                        "Jacket, Sweater & Sweatshirts",
                        "Party Wear",
                        "Innerwear & Thermals",
                        "Nightwear & Loungewear",
                        "Value Packs",
                    ]
                }
            ],
            section2: [
                {
                    heading: "Girls Clothing",
                    items: [
                        "Dresses",
                        "Tops",
                        "Tshirts",
                        "Clothing Sets",
                        "Lehenga choli",
                        "Kurta Sets",
                        "Party wear",
                        "Dungarees & Jumpsuits",
                        "Skirts & shorts",
                        "Tights & Leggings",
                        "Jeans, Trousers & Capris",
                        "Jacket, Sweater & Sweatshirts",
                        "Innerwear & Thermals",
                        "Nightwear & Loungewear",
                        "Value Packs",
                    ]
                }
            ],
            section3: [
                {
                    heading: "Footwear",
                    items: [
                        "Casual Shoes",
                        "Flipflops",
                        "Sports Shoes",
                        "Flats",
                        "Sandals",
                        "Heels",
                        "School Shoes",
                        "Socks",
                    ]
                },
                {
                    heading: "Toys & Games",
                    items: [
                        "Learning & Development",
                        "Activity Toys",
                        "Soft Toys",
                        "Action Figure / Play set",
                    ]
                }
            ],
            section4: [
                {
                    heading: "Infants",
                    items: [
                        "Bodysuits",
                        "Rompers & Sleepsuits",
                        "Clothing Sets",
                        "Tshirts & Tops",
                        "Dresses",
                        "Bottom wear",
                        "Winter Wear",
                        "Innerwear & Sleepwear",
                        "Infant Care",
                    ]
                },
                {
                    heading: "Home & Bath",
                    items: [
                    ]
                },
                {
                    heading: "Personal Care",
                    items: [
                    ]
                }
            ], 
        },

        {
            title: "ACCESSORIES",
            section1: [
                {
                    heading: "Indian & Fusion Wear",
                    items: [
                    "Kurtas & Suits",
                    "Kurtis",
                    "Sarees",
                    "Ethnic Wear"
                    ]
                },
                {
                    heading: "Western Wear",
                    items: [
                    "Dresses",
                    "Tops",
                    "Jeans",
                    "Co-ords"
                    ]
                }
            ]
        }
    ];

    const navigate = useNavigate()



    return (
        <header className="bg-[#f1f1f1] shadow-md shadow-gray-300">
            <nav className="flex justify-around items-center">
                <div className="flex items-center gap-2.5">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className="cursor-pointer md:hidden"
                > 
                 <g mask="url(#mask0_1943_854)"> <path d="M4 17.2692V16.2692H15V17.2692H4ZM4 12.5V11.5H20V12.5H4ZM4 7.73071V6.73071H20V7.73071H4Z" fill="#121212"></path> </g> </svg>

                <Link to="/home">
                    <h1 
                        className="
                            font-sekuya 
                            text-xl 
                            sm:text-2xl 
                            font-bold 
                            cursor-pointer
                        "
                    >
                        KriRa
                    </h1>
                </Link>


                <div 
                className="
                    hidden 
                    md:flex 
                    items-center 
                    gap-[2.5vw]
                    xl:gap-[4.5vw] 
                    text-gray-500
                    relative
                ">

                    {menuData.map(menu => (
                        <MegaMenu key={menu.title} title={menu.title} section1={menu.section1} section2={menu.section2} section3={menu.section3} section4={menu.section4} section5={menu.section5} />
                    ))}

                    <div className="addHoverEffect py-7">BLOGS</div>
                </div>
                </div>


                <div className="flex items-center gap-5 lg:gap-8">
                    <div 
                        className="
                        hidden 
                        lg:flex 
                        items-center 
                        gap-2 
                        bg-gray-500/15 
                        p-2 
                        rounded-full 
                    ">
                        <IoSearchSharp className="text-lg sm:text-2xl" />
                        
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="outline-none" 
                        />
                    </div>

                    <IoSearchSharp className="hidden sm:block text-lg sm:text-2xl lg:hidden cursor-pointer" />

                    <MdFavoriteBorder className="hidden sm:block text-lg sm:text-2xl cursor-pointer" onClick={() => navigate('/wishlist')} />

                    <div className="relative">
                        <MdOutlineShoppingBag onClick={() => navigate('/cart')} className="text-lg sm:text-2xl cursor-pointer" />

                        <span className="absolute top-0 right-0 -mt-2.5 -mr-3 text-sm ">
                            <div className="w-full px-1 rounded-full h-full bg-red-500 text-white shrink-0">{props.cartLength}</div>
                        </span>
                    </div>

                    <div className="relative group">
                        <FaRegUser onClick={() => navigate('/profile')} className="text-lg sm:h-24 cursor-pointer py-7" />

                        <ul className="absolute top-full -right-5 mt-0 hidden group-hover:flex bg-[#ebebeb] flex-col z-50 p-3 whitespace-nowrap border border-gray-400 rounded-md space-y-1 w-60 text-gray-600 text-sm">
                            <li className="text-black font-bold">Hello, Biman Nandi</li>
                            <li>8392014230</li>

                            <hr className="text-gray-300" />

                            <li><span onClick={() => navigate('/profile/orders')} className="hover:underline cursor-pointer">Orders</span></li>
                            <li><span onClick={() => navigate('/wishlist')} className="hover:underline cursor-pointer">Wishlist</span></li>

                            <li><span className="hover:underline cursor-pointer">Contact Us</span></li>
                            <hr className="text-gray-300" />

                            <li><span className="hover:underline cursor-pointer">Coupons</span></li>
                            <li><span onClick={() => navigate('/profile/manage-address')} className="hover:underline cursor-pointer">Saved Address</span></li>
                            <hr className="text-gray-300" />

                            <li><span onClick={() => navigate('/profile')} className="hover:underline cursor-pointer">Edit Profile</span></li>
                            <li><span onClick={() => handleLogOut(navigate)} className="hover:underline cursor-pointer">Logout</span></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}