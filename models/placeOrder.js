const mongoose = require('mongoose');
const Orders = new mongoose.Schema({
    c_unique_id : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    c_name : {
        type : String,
        required : true
    }
})
const orderSchema = new mongoose.Schema({
    order : [Orders]
})

const Order = mongoose.model("order",orderSchema);

module.exports = Order;