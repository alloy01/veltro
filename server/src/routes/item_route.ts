import express from "express";
import userAuth from "../middlewares/auth_mw.js";
import { addItem, editItem, deleteItem, getItems } from "../controllers/items/item_crud.js";

const itemRouter = express.Router();
itemRouter.use(userAuth);

itemRouter.get('/', getItems);
itemRouter.post('/', addItem);
itemRouter.patch('/:id', editItem);
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
