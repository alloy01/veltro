import jwt from "jsonwebtoken";
import sendResponse from "../utils/response.js";
import type {Request, Response, NextFunction } from "express";
import JWT_SECRET from "../configs/env_config.js";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    
    const {token} = req.cookies;

    if(!token){
        return sendResponse(res, false, 'Not authenticated, login again.', 401);
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as TokenDecode;

        if(decoded.id){
            req.user = {
                id: decoded.id,
                username: decoded.username
            }
        }
        else{
            return sendResponse(res, false, 'Not authenticated, login again.', 401);
        }

        next();
    }
    catch(err){
        console.log(`Err: `, err);

        return sendResponse(res, false, 'Something went wrong', 401);
    }
}

export default userAuth;