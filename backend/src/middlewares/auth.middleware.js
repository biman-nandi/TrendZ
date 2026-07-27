import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";

export const verifyJWT = AsyncHandler(async(req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded
    
    next()
})