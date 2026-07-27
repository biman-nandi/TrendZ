import './App.css'
import { Home } from './Components/Home'
import { CollectionsPage } from "./Components/CollectionsPage"
import { ProductPage } from './Components/ProductPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CartPage } from './Components/CartPage'
import { useState, useEffect } from 'react'
import { Wishlist } from './Components/Wishlist'
import { LoginPage } from './Components/LoginPage'
import { OtpPage } from './Components/OtpPage'
import { GuestRoute } from './Components/GuestRoute'
import { Toaster } from "react-hot-toast"
import Profile from './Components/Profile'
import { Orders } from "./Components/Orders.jsx"
import { MyAddress } from "./Components/MyAddress.jsx"


function App() {
  const [cartLength, setCartLength] = useState(0);

useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    setCartLength(total);
}, []);

  return (
    <>
      <Toaster position="bottom-center" />

      <Routes>
        <Route path='/' element={<Navigate to='/home' />}></Route>

        <Route element={<GuestRoute />}>
          <Route path='/login' element={<LoginPage />}></Route>

          <Route path='/verify-otp' element={<OtpPage />}></Route>
        </Route>

        <Route path='/home' element={<Home cartLength={cartLength} />}></Route>
        
        <Route path='/collections' element={<CollectionsPage cartLength={cartLength}  />}></Route>

        <Route path='/product/:slug' element={<ProductPage cartLength={cartLength} setCartLength={setCartLength} />}></Route>

        <Route path='/cart' element={<CartPage cartLength={cartLength} setCartLength={setCartLength} />}></Route>
        
        <Route path='/wishlist' element={<Wishlist cartLength={cartLength} setCartLength={setCartLength} />}></Route>

        <Route path='/profile' element={<Profile />}></Route>
        {/* <Route path='/profile/personal-info' element={<PersonalInfo />}></Route> */}
        <Route path='/profile/orders' element={<Orders />}></Route>
        <Route path='/profile/manage-address' element={<MyAddress />}></Route>        
      </Routes>
    </>
  )
}

export default App
