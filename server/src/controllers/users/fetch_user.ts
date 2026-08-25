import type { Request, Response } from "express";
import userModel from "../../models/user.js";
import sendResponse from "../../utils/response.js";

export const fetchUser = async (req: Request, res: Response) => {

    if(!req.user){
        return sendResponse(res, false, 'User not authenticated', 401);
    }

    const userId = req.user?.id;

    try{
        const user = await userModel.findById(userId);

        if(!user){
            return sendResponse(res, false, 'User does not exist.', 404);
        }

        const payload = {
            name: user.username,
            email: user.email
        }

        return sendResponse(res, true, 'User fetched successfully.', 200, payload);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong.', 500);
    }
}