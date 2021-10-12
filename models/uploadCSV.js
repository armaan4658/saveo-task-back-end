const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
    c_name : {
        type: String
    },
    c_batch_no : {
        type: String
    },
    d_expiry_date : {
        type: String
    },
    n_balance_qty : {
        type: String
    },
    c_packaging : {
        type: String
    },
    c_unique_code : {
        type: String
    },
    c_schemes : {
        type: String
    },
    n_mrp : {
        type: String
    },
    c_manufacturer : {
        type: String
    },
    hsn_code : {
        type: String
    }
})
const CsvModel = mongoose.model("csv",csvSchema);
module.exports = CsvModel;