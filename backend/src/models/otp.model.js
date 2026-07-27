import mongoose, {Schema} from "mongoose";

const otpSchema = new Schema(
    {
        email: {
            type: String,
            default: null,
        },
        mobile: {
            type: String,
            default: null
        },
        verificationCode: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const OtpModel = mongoose.model('OTP', otpSchema)