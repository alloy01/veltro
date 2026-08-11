import {itemModel} from "../../models/items.js"
import { res_help } from "../../utils/response.js";

export const addItem = async(req,res) => {
    if(!req.body){
        return res_help(res,false,"No data provided.")
    }
    //check if req.body is empty

    const user = req.user.id;

    const {item_name, item_desc, item_category, item_quantity, item_unit, item_costprice, item_supplier, item_status} = req.body;

    if(!user){
        return res_help(res,false,"User not specified.")
    }

    if(!item_name || !item_category || item_quantity === undefined || item_costprice === undefined || !item_supplier){
        return res_help(res,false,"Incomplete details.")
    }
    //check if required details are present

    try{
        const existingItem = await itemModel.findOne({item_name, user})
        if(existingItem){
            return res_help(res,false,"Item already exists.")
        }
        //check if theres already an item with the same name

        const item = new itemModel({
            user,
            item_name,
            item_desc,
            item_quantity,
            item_unit,
            item_category,
            item_costprice,
            item_supplier,
            item_status
        })

        await item.save();
        //save the item

        return res_help(res,true,"Item added successfully.")
    }
    catch(err){
        return res_help(res,false,err.message.toString())
    }
}

export const editItem = async(req,res) => {
    if(!req.body){
        return res_help(res,false,"No data provided.")
    }
    // check if req.body is empty 

    const user = req.user.id;

    let {item_name, item_supplier, item_quantity, item_costprice, item_category, item_unit, item_status, item_desc} = req.body;

    if(!user){
        return res_help(res,false,"User not specified.")
    }

    if(!item_name){
        return res_help(res,false,"Incomplete details.")
    }
    //check if details are missing

    if(!item_desc && !item_category && item_quantity !== undefined && !item_status && item_costprice !== undefined && !item_unit && !item_supplier){
        return res_help(res,false,"No parameter found to update.")
    }

    try{
        const existingItem = await itemModel.findOne({item_name, user})
        if(!existingItem){
            return res_help(res,false,"Item does not exist.")
        }
        //handling the case if item does not exist

        if(item_quantity !== undefined){
            if(item_quantity === 0){
                item_status = "Out of Stock";
            }
            else{
                item_status = "In Stock";
            }
        }
        else if(item_status === "Out of Stock"){
            item_quantity = 0;
        }
        // we don't want to show quantity = 0 & In Stock, it would be a logical error

        const updatedItem = await itemModel.findOneAndUpdate({item_name, user},{
            ...(item_supplier !== "" && { item_supplier }),
            ...((item_quantity !== undefined && item_quantity !== "") && { item_quantity }),
            ...(item_status !== undefined && { item_status }),
            ...((item_costprice !== undefined && item_costprice !== "") && { item_costprice }),
            ...(item_category !== "" && { item_category }),
            ...(item_unit !== "" && { item_unit }),
            ...(item_desc !== "" && { item_desc })
        },{new:true});
        // update the variables whose parameters are present

        return res_help(res,true,"Item updated successfully.")
    }
    catch(err){ 
        return res_help(res,false,err.message.toString())
    }
}

export const deleteItem = async(req,res) => {
    if(!req.body){
        return res_help(res,false,"No data provided.")
    }
    //check if req.body is empty

    const user = req.user.id;

    const {item_name} = req.body;

    if(!user){
        return res_help(res,false,"User not specified.")
    }

    if(!item_name){
        return res_help(res,false,"Incomplete details.")
    }

    try{
        const item = await itemModel.findOne({item_name, user})

        if(!item){
            return res_help(res,false,"Item does not exist.")
        }
        //handling the case if item does not exist

        await itemModel.findOneAndDelete({item_name, user})

        return res_help(res,true,"Item was deleted successfully.")
    }
    catch(err){
        return res_help(res,false,err.message.toString())
    }
}

export const filterItem = async (req,res) => {
    if(!req.body){
        return res_help(res,false,"No data provided.")
    }
    //check if req.body is empty

    const user = req.user.id;

    const {item_filter_field, item_filter_param} = req.body;

    if(!user){
        return res_help(res,false,"User not specified.");
    }

    const allowedFilters = [
        "item_name",
        "item_category",
        "item_supplier",
        "item_status",
        "item_unit",
        "item_costprice",
        "item_quantity"
    ];
    // to stop attackers from typing any arbitary values

    if (!allowedFilters.includes(item_filter_field)) {
        return res_help(res, false, "Invalid filter field.");
    }

    //filter is the field name, param is the value to search for (e.g., category = "medicine")

    try{
        const items = await itemModel.find({
            [item_filter_field] : item_filter_param
        , user})
        //find the matches of filter x param

        if(items.length === 0){
            return res_help(res,false,"No matches of filter & parameter found.")
        }
        //handling if match not found

        return res.json({
            success:true,
            message:"Match of filter & parameter found.",
            payload:items
        })
    }
    catch(err){
        return res_help(res,false,err.message.toString())
    }
}

export const getRecentDocument = async (req, res) => {
    const user = req.user.id;

    try{
        const documents = await itemModel.find({user}).sort({createdAt: -1}).limit(50)

        return res.json({
            success: true,
            message: "Documents fetched successfully.",
            payload: documents
        })
    }
    catch(err){
        return res_help(res, false, err.message)
    }
}