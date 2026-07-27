import { transporter } from "./Email.config.js";
import { Verification_Email_Template } from "../libs/EmailTemplate.js"
import { verified_Email_Template } from "../libs/VerifiedEmailTemplate.js";

export const SendVerificationCode = async(email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: `"TrenZ Team" <${process.env.SMTP_USER}>`, // sender address
            to: email, // list of recipients
            subject: "Verify your Email", // subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template(verificationCode), // HTML body
        });

        console.log('verification code sent successfully on your email')
    } catch (error) {
        console.log('Email Error', error.message)
    }
}

export const SendLoginEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: `"TrenZ Team" <${process.env.SMTP_USER}>`, // sender address
            to: email, // list of recipients
            subject: "Your Email is Verified", // subject line
            text: "Your Email is Verified", // plain text body
            html: verified_Email_Template(), // HTML body
        });

        console.log('Log in email sent successfully')
    } catch (error) {
        console.log('Email Error', error.message)
    }
}