import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    item_name:{
        type:String,
        required:true
    },
    item_desc:{
        type:String,
        default: ""
    },
    item_category:{
        type:String,
        required:true
    },
    item_quantity:{
        type:Number,
        required:true
    },
    item_unit:{
        type:String,
        default:"Piece"
    },
    item_costprice:{
        type:Number,
        required:true
    },
    item_supplier:{
        type:String,
        required:true
    },
    item_status:{
        type:String,
        enum:["Out of Stock","In Stock"],
        default:"Out of Stock"
    }
},{timestamps:true});
//create a schema with the required attributes in it

const itemModel = mongoose.model("item",itemSchema);
//creating a models based on the schema above and the model

export {itemModel}