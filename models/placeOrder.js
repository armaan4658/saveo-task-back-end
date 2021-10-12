const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order : {
        type : Array,
        required : true
    }
})

const Order = mongoose.model("order",orderSchema);

module.exports = Order;