import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    item_name: {
        type: String,
        required: true
    },
    item_desc: {
        type: String,
        default: ''
    },
    item_category: {
        type: String,
        required: true
    },
    item_quantity: {
        type: Number,
        required: true
    },
    item_unit: {
        type: String,
        default: 'Piece'
    },
    item_costprice: {
        type: Number,
        required: true
    },
    item_supplier: {
        type: String,
        required: true
    },
    item_status: {
        type: String,
        enum: ['Out of Stock', 'In Stock'],
        default: 'In Stock'
    }
}, {timestamps: true});

const itemModel = mongoose.model('item', itemSchema);

export default itemModel;