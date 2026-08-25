import express from "express";
import userAuth from "../middlewares/auth_mw.js";
import { addItem, editItem, deleteItem, filterItem, getItems } from "../controllers/items/item_crud.js";

const itemRouter = express.Router();
itemRouter.use(userAuth);

itemRouter.get('/fetch', getItems);
itemRouter.post('/add', addItem);
itemRouter.post('/edit', editItem);
itemRouter.post('/delete', deleteItem);
itemRouter.post('/filter', filterItem);

export default itemRouter;
