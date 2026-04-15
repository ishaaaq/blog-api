import { Request, Response, NextFunction } from "express"
import jwt  from "jsonwebtoken"
import { user } from "../types"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    //get the token  in the header, get the actual characters in it and verify its there,
    //  and then verify its validity and get back the decoded payload. finally assign it to request user
     try {
    // 1. Get the token (Bearer token) from the header
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split('')[1]

    if (!token){
        return res.status(401).json({message: "You are unauthorized"})
    }

    //this line throws an error if the token is invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as any

    next()
        
    } catch (error) {
        //thrown error from jwt is caught and this meand the user is forbidden to proceed
        return res.status(403).json({message: "Invalid token"})
    }
}