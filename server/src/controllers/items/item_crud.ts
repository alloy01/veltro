import type { Request, Response } from "express";
import itemModel from "../../models/item.js";
import sendResponse from "../../utils/response.js";

export const addItem = async (req: Request, res: Response) => {

    const user = req.user?.id;

    const {item_name, item_desc, item_category, item_quantity, item_unit, item_costprice, item_supplier, item_status} = req.body;

    if(!user){
        return sendResponse(res, false, 'User not authenticated', 401);
    }

    if(!item_name || !item_category || item_quantity === undefined || item_costprice === undefined || !item_supplier){
        return sendResponse(res, false, 'Information is incomplete.', 400);
    }

    try{
        const existingItem = await itemModel.findOne({item_name, user});

        if(existingItem){
            return sendResponse(res, false, 'Item already exists.', 409);
        }

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

        return sendResponse(res, true, 'Item added successfully.', 201);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong', 500);
    }
}

export const editItem = async (req: Request, res: Response) => {
    
    const user =  req.user?.id;

    let {item_name, item_supplier, item_quantity, item_costprice, item_category, item_unit, item_status, item_desc} = req.body;

    if(!user){
        return sendResponse(res, false, 'User not authenticated.', 401);
    }

    if(!item_name){
        return sendResponse(res, false, 'Item name not provided.', 400);
    }

    if(
        item_desc === undefined &&
        item_category === undefined &&
        item_quantity === undefined &&
        item_status === undefined &&
        item_costprice === undefined &&
        item_unit === undefined &&
        item_supplier === undefined
    ){
        return sendResponse(res,false,'No parameter found to update.', 400);
    }
    
    try{
        const item = await itemModel.findOne({item_name, user});
        
        if(!item){
            return sendResponse(res, false, 'Item does not exist.', 404);
        }

        if(item_quantity !== undefined){
            if(item_quantity === 0){
                item_status = 'Out of Stock';
            }
            else{
                item_status = 'In Stock';
            }
        }
        else if(item_status === 'Out of Stock'){
            item_quantity = 0;
        }

        const updatedItem = await itemModel.findOneAndUpdate({item_name, user}, {
            ...(item_supplier !== "" && { item_supplier }),
            ...((item_quantity !== undefined && item_quantity !== "") && { item_quantity }),
            ...(item_status !== undefined && { item_status }),
            ...((item_costprice !== undefined && item_costprice !== "") && { item_costprice }),
            ...(item_category !== "" && { item_category }),
            ...(item_unit !== "" && { item_unit }),
            ...(item_desc !== "" && { item_desc })
        }, {returnDocument: 'after'});

        return sendResponse(res, true, 'Item updated successfully.', 200);

    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong.', 500);
    }

}

export const deleteItem = async (req: Request, res: Response) => {
    
    const user = req.user?.id;

    const {item_name} = req.body;

    if(!user){
        return sendResponse(res, false, 'User not authenticated.', 401);
    }

    if(!item_name){
        return sendResponse(res, false, 'Information is incomplete.', 400);
    }

    try{
        const item = await itemModel.findOne({item_name, user});

        if(!item){
            return sendResponse(res, false, 'Item does not exist.', 404);
        }

        await itemModel.findOneAndDelete({item_name, user});

        return sendResponse(res, true, 'Item was deleted successfully.', 200);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong.', 500);
    }
}

export const filterItem = async (req: Request, res: Response) => {
    
    const user = req.user?.id;

    const {item_filter_field, item_filter_param} = req.body;

    if(!user){
        return sendResponse(res, false, 'User not authenticated.', 401);
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

    if(!allowedFilters.includes(item_filter_field)){
        return sendResponse(res, false, 'Invalid filter field', 400);
    }

    try{
        const items = await itemModel.find({
            [item_filter_field] : item_filter_param
        , user});

        if(items.length === 0){
            return sendResponse(res, false, 'No matches of filter & parameter found', 404);
        }

        return sendResponse(res, true, 'Matches of filter & parameter found.', 200, items);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong.', 500);
    }
}

export const getItems = async (req: Request, res: Response) => {

    if(!req.user){
        return sendResponse(res, false, "User not authenticated.", 401);
    }

    const user = req.user?.id;

    try{
        const documents = await itemModel.find({user}).sort({createdAt: -1}).limit(50)

        return sendResponse(res, true, 'Documents fetched successfully', 200, documents);
    }
    catch(err){
        if(err instanceof Error){
            console.error(err.message);
        }

        return sendResponse(res, false, 'Something went wrong', 500);
    }
}