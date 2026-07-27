export const sellerData = async () => {
    try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/products?sort=best-seller&limit=10`)
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
// [
//     {
//         id:1,
//         url: "https://rukminim1.flixcart.com/image/1920/1920/xif0q/ethnic-set/m/u/v/m-rds2297-pschoice-original-imahh2g5gnyfebfe.jpeg?q=90",
//         title: "PSCHOICE Women Viscose Rayon Kurti Pant Dupatta Set",
//         offer: 30,
//         price: 400
//     },
//     {
//         id:2,
//         url: "https://rukminim1.flixcart.com/image/1920/1920/xif0q/speaker/t/s/g/-original-imahgb43eunwxkwz.jpeg?q=90",
//         title: "ZEBRONICS Juke Bar 9451 (SBSPK C8) Dolby Audio Wireless Subwoofer & Dual Satellite 600 W Bluetooth Soundbar (Black, 5.1 Channel)",
//         price: 8999
//     },
//     {
//         id:3,
//         url: "https://rukminim1.flixcart.com/image/1920/1920/xif0q/mobile/n/q/b/-original-imahnhc3jzeqmvh8.jpeg?q=90",
//         title: "vivo X300 FE (Urban Olive, 256 GB) (12 GB RAM)",
//         price:  79999
//     },
//     {
//         id:4,
//         url: "https://rukminim1.flixcart.com/image/960/960/xif0q/television/a/b/g/-original-imahzcarqq9yzpgh.jpeg?q=90",
//         title: "Vision AI 138 cm (55 inch) Ultra HD (4K) Mini LED Smart Tizen TV 2026 Edition with Vision AI Companion 30W Powerful Speakers Mini LED HDR Pure Spectrum Color 4K Upscaling Color Booster Samsung Knox Security 150+ Free Channels Dynamic Sound Pack (UA55M2EHAULXL)",
//         offer: 20,
//         price: 5399
//     },
//     {
//         id: 5,
//         url: "https://rukminim1.flixcart.com/image/1920/1920/xif0q/computer/m/8/6/-original-imahzcaygrxjg4e8.jpeg?q=90",
//         title: "Samsung Galaxy Book4 Metal Intel Core i5 13th Gen 1335U - (16 GB/512 GB SSD/Windows 11 Home) NP750XGJ Thin and Light Laptop (15.6 Inch, Gray, 1.55 Kg, With MS Office)",
//         price: 62990
//     },
//     {
//         id: 6,
//         url: "https://rukminim1.flixcart.com/image/1920/1920/xif0q/air-conditioner-new/h/2/y/-original-imahm9zqtaxghmgg.jpeg?q=90",
//         title: "MOTOROLA 2026 Model 1.5 Ton 5 Star Split Inverter with Wi-fi | Free Installation with 3-Year Comprehensive Warranty with Attachments included AC (155IPG26WMRS, White)",
//         offer: 10,
//         price: 36990
//     },
//     {
//         id: 7,
//         url: "https://www.jockey.in/cdn/shop/files/MV16_SUNDT_0103_S125_JKY_1.webp?v=1714720112&width=720",
//         title: "Lightweight Microfiber Solid Round Neck Half Sleeve T-Shirt with Breathable Mesh - Sundried Tomato",
//         price: 7999
//     },
//     {
//         id: 8,
//         url: "https://rukminim1.flixcart.com/image/1920/1920/xif0q/television/g/k/3/-original-imahzehpzhfragn3.jpeg?q=90",
//         title: "XIAOMI FX Series 165.1 cm (65 inch) Ultra HD (4K) Mini LED Smart Fire TV 2026 Edition with Alexa built-in , Quantum Dot Filter , DLG 120Hz , HDR 10+, 32 GB Storage , Dolby Audio,Premium Metallic Finish Design , Film-maker Mode , Mi TV (L65MC-FSMIN)",
//         offer: 35,
//         price: 64999
//     },
//     {
//         id: 9,
//         url: "https://m.media-amazon.com/images/I/51O29bgRQVL._SL1500_.jpg",
//         title: "Whirlpool 184 L 4 Star Inverter Direct-Cool Single Door Refrigerator (205 WDE PRM 4SInv SAPPHIRE FLOWER RAIN-Z, Blue)",
//         price: 15840
//     },
//     {
//         id: 10,
//         url: "https://m.media-amazon.com/images/I/61LnPbT7KML._SL1500_.jpg",
//         title: "EUCOS 62\" Phone Tripod, Tripod for iPhone & Selfie Stick with Remote, Extendable Cell Phone Stand & Ultimate Phone Holder, Solidest Phone Stand Compatible with iPhone/Android",
//         offer: 10,
//         price: 36990
//     }
// ]