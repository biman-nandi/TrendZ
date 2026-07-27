import { AsyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"
import { OtpModel } from "../models/otp.model.js"
import { UserModel } from "../models/user.model.js"
import { SendVerificationCode, SendLoginEmail } from "../middlewares/Email.js"
import jwt from "jsonwebtoken"

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const sendOTP = AsyncHandler(async (req, res) => {
    const { email, mobile } = req.body

    if ((email && mobile) || (!email && !mobile))
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    "Provide either email or mobile"
                )
            )

    const otp = generateOTP()

    const identifier = email ? { email } : { mobile }

    await OtpModel.deleteMany(identifier)
    
    await OtpModel.create({
        email,
        mobile,
        verificationCode: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    })
    
    if (email) {
        await SendVerificationCode(email, otp)
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                "200",
                null,
                "OTP sent successfully"
            )
        )
})

const verifyOTP = AsyncHandler(async (req, res) => {
    const {email, mobile, verificationCode} = req.body

    const identifier = email ? {email} : {mobile}

    const otpDoc = await OtpModel.findOne({
        ...identifier,
        verificationCode
    })

    if (!otpDoc){
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    "Invalid OTP! please enter a valid one"
                )
            )
    }

    if (otpDoc.expiresAt < new Date()) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    "OTP Expired"
                )
            )
    }

    // User Model
    let user = await UserModel.findOne(identifier)

    if (!user) {
        user = await UserModel.create({
            email,
            mobile,
            email_verified: !!email,
            mobile_verified: !!mobile
        })
    }

    if (email) {
        user.email_verified = true
    }
    if (mobile) {
        user.mobile_verified = true
    }

    await user.save()

    await otpDoc.deleteOne()

    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )

    if (email) {
        await SendLoginEmail(email)
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user
                },
                "Login successful"
            )
        )
})

const logout = AsyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .json(
            new ApiResponse(
                200,
                null,
                "Logged out successfully"
            )
        )
})

const checkAuth = AsyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Authenticated"
            )
        )
})

export { sendOTP, verifyOTP, logout, checkAuth }