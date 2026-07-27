import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true,
            trim: true,
            match: [/^[^\s@]+.[^\s@]+@[^\s@]+$/, 'Please enter a valid email address']
        },
        mobile: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            match: [/^[6-9]\d{9}$/, 'Invalid mobile number']
        },
        email_verified: {
            type: Boolean,
            default: false
        },
        mobile_verified: {
            type: Boolean,
            default: false
        },
        profile_image: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
    },
    {
        timestamps: true
    }
)

export const UserModel = mongoose.model('User', userSchema)