import { userModel } from "../../models/users.js";
import { res_help } from "../../utils/response.js";

export const getData = async (req,res) =>{
    const {userId} = req.body;
    //gets userId from body of the req
    
    try{
        const user = await userModel.findById(userId)

        if(!user){
            return res_help(res,false,"User does not exist.")
        }
        //checks if user exists or not

        const payload = {
            name: user.name,
            email: user.email
        }

        return res_help(res, true, "User data fetched successfully.", payload);
        
    } 
    catch(err){
        return res_help(res,false,err.message.toString())
    }
}