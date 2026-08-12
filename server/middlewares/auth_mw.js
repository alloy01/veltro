import jwt from 'jsonwebtoken';
import { res_help } from '../utils/response.js';

const userAuth = async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return res_help(res,false,"Not authorized.login again.")
    }
    //checks if token exists or not

    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.user = {
                id:tokenDecode.id, 
                username:tokenDecode.username 
            }
        }
        else{
            return res_help(res,false,"Not authorized, login again.")
        }
        //decodes token and attaches token id to req.body

        next()
        //since this function is a middleware there will be a next function to that needs to be executed 
    }
    catch(err){
        console.log(err.message);
        return res_help(res,false, "Something went wrong.");
    }
}

export {userAuth}