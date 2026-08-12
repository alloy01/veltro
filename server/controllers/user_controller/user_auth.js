import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {userModel} from '../../models/users.js';
import { res_help } from '../../utils/response.js';

export const register = async (req,res)=>{
    if(!req.body){
        return res_help(res,false,"No data provided.")
    }
    //check if req.body is empty

    const {username,email,password} = req.body;

    if(!username){
        return res_help(res,false,"Username is required.")
    }
    if(!email){
        return res_help(res,false,"Email is required.")
    }
    if(!password){
        return res_help(res,false,"Password is required.")
    }
    //check if details are incomplete

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res_help(res,false,"User already exists.")
        }
        //check if theres already an existing user with same email

        const hashedPassword = await bcrypt.hash(password,10)
        const user = new userModel({
            username,
            email,
            password:hashedPassword
        })
        await user.save();
        //hash the password entered by the user and create a new document with the details and save

        const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn: '30d'})
        //creating a token that has user id and username encoded in it with the help of enviornment variable JWT_SECRET that expires in 30 days

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 30*24*60*60*1000
        })
        //send token as a cookie through response that varies on node enviornment with maxAge in secs 

        return res_help(res,true,"Welcome.")
    }
    catch(err){
        console.log(err.message);
        return res_help(res,false, "Something went wrong.");
    }
}

export const login = async (req,res)=>{
    if(!req.body){
        return res_help(res,false,"No data provided.")
    }
    //check if req.body is empty

    const {email,password} = req.body;
    //get email and password from the body of request 

    if(!email){
        return res_help(res,false,"Email is required.")
    }
    if(!password){
        return res_help(res,false,"Password is required.")
    }
    //check for missing detail

    try{
        const user = await userModel.findOne({email});
        //find user with the help of email

        if(!user){
            return res_help(res,false,"Invalid email or password.")
        }
        //if user doesnt exist then response will be invalid email or password to avoid brute force attempt by intruder

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res_help(res,false,"Invalid email or password.")
        }
        //if password is wrong then response will be invalid email or password to avoid brute force attempt by intruder

        const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn: '30d'})
        //creating a token that has user id and username encoded in it with the help of enviornment variable JWT_SECRET that expires in 30 days

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 30*24*60*60*1000
        })
        //send token as a cookie through response that varies on node enviornment with maxAge in secs 

        return res_help(res,true,"Welcome.")
    }
    catch(err){
        console.log(err.message);
        return res_help(res,false, "Something went wrong.");
    }
}

export const logout = async (req,res) => {
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        //clearing a cookie and terminating a session

        return res_help(res,true,"Logged out of account.")
    }
    catch(err){
        console.log(err.message);
        return res_help(res,false, "Something went wrong.");
    }
}

export const isAuthenticated = async (req,res)=>{
    try{
        const payload = {
            userId: req.user.id,
            username: req.user.username
        }

        return res_help(res, true, "User is authenticated.", payload);
    }
    catch(err){
        console.log(err.message);
        return res_help(res,false, "Something went wrong.");
    }
}
//a function that will be used in a route which then will be called by client side to check whether the user is authenticated or not