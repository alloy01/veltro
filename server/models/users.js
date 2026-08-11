import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
//create a schema with the required attributes in it

const userModel = mongoose.model('user',userSchema);
//creating a models based on the schema above and the models will be 'users'

export { userModel }
