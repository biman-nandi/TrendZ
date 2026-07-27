import { Router } from "express";
import { sendOTP, verifyOTP, logout, checkAuth } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const authRouter = Router()

authRouter.post('/login', sendOTP)
authRouter.post('/verify-otp', verifyOTP)
authRouter.post('/logout', logout)
authRouter.get('/check-auth',verifyJWT ,checkAuth)