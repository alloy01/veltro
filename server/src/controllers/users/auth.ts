import type { Response, Request} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendResponse from "../../utils/response.js";
import userModel from "../../models/user.js";
import JWT_SECRET from "../../configs/env_config.js";

export const register = async (req: Request, res: Response) => {

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return sendResponse(res, false, 'Information is incomplete.', 400);
    }

    try{
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return sendResponse(res, false, 'User already exists.', 409);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password: hashPassword
        });

        await user.save();

        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET, {expiresIn: '30d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
            maxAge: 30*24*60*60*1000
        });

        return sendResponse(res, true, `Welcome ${username}.`, 201);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }
        
        return sendResponse(res, false, 'Something went wrong.', 400);
    }
}

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if(!email || !password){
        return sendResponse(res, false, 'Information is incomplete.', 400);
    }

    try{
        const user = await userModel.findOne({email});

        if(!user){
            return sendResponse(res, false, 'Invalid email or password.', 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return sendResponse(res, false, 'Invalid email or password.', 404);
        }

        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET, {expiresIn: '30d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
            maxAge: 30*24*60*60*1000
        });

        return sendResponse(res, true, `Welcome ${user.username}.`, 200);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }
        
        return sendResponse(res, false, 'Something went wrong.', 400);
    }
}

export const logout = async (req: Request, res: Response) => {

    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong.', 400);
    }
}

export const isAuthenticated = async (req: Request, res: Response) => {

    try{
        if(!req.user){
            return sendResponse(res, false, "Not authenticated.", 401);
        }

        const payload = {
            userId: req.user.id,
            username: req.user.username
        }

        sendResponse(res, true, 'User is authenticated.', 200, payload);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }
        
        return sendResponse(res, false, 'Something went wrong.', 400);
    }
}

// A function that will be used in a route which then will be called by client side to check whether the user is authenticated or not