export const arrivals = async () => {
    try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/products?sort=new-arrivals&limit=10`)
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data.data; 
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

/* [
    {
        id:1,
        url: "https://finisterre.com/cdn/shop/files/highsummer-OB-15_360x.jpg?v=1778507147",
        title: "Women's Seren Stripe Shirt",
        offer: 30,
        price: 14500
    },
    {
        id:2,
        url: "https://rukminim2.flixcart.com/image/960/960/xif0q/mobile/s/t/g/-original-imahft5gqkxzyeqa.jpeg?q=90",
        title: "APPLE iPhone 17 (Black, 256 GB)",
        price: 77900
    },
    {
        id:3,
        url: "https://rukminim2.flixcart.com/image/960/960/xif0q/shoe/8/u/u/10-dv1487-162-10-nike-white-original-imahhae4n3eabkvx.jpeg?q=90",
        title: "NIKE AIR MAX DAWN Sneakers For Unisex",
        price:  5398
    },
    {
        id:4,
        url: "https://rukminim2.flixcart.com/image/960/960/xif0q/jacket/d/7/1/xxl-1-yes-63487501-puma-original-imahjyk5p4n25nyn.jpeg?q=90",
        title: "PUMA Men Solid Casual Jacket",
        offer: 20,
        price: 5399
    },
    {
        id:5,
        url: "https://rukminim2.flixcart.com/image/960/960/xif0q/headphone/b/6/9/-original-imahgnf4b8rpfpr9.jpeg?q=90",
        title: "boAt Rockerz 301 ANC,13mm Drivers,Hall Switch, ~30dB ANC,Stream Ad Free Music via App Bluetooth Headset (Green, In the Ear)",
        price: 1499
    },
    {
        id:6,
        url: "https://rukminim2.flixcart.com/image/1920/1920/xif0q/sock/x/f/2/m-1-ht3431-adidas-original-imahcrmdgzbm9hz3.jpeg?q=90",
        title: "adidas Men Solid Mid-Calf/Crew (Pack of 3)",
        offer: 10,
        price: 317
    }
]
 */