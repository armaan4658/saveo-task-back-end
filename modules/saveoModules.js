const CsvModel = require('../models/uploadCSV.js');
const Order = require('../models/placeOrder.js');
const uploadCSV = async(req,res)=>{
    try{
        // checking if file is of type csv
        let type = req.file.originalname.split('.');
        if(type[1] === "csv"){
            let results = [];
            var csv=req.file.buffer.toString('utf8');
            // converting csv file to json
            results = csvToJson(results,csv);
            if(results.length > 2){
                await CsvModel.insertMany(results);
                res.send("uploaded");
            }
            else if(results.length <= 1){
                res.send("Incorrect file")
            }
            else{
                let data = new CsvModel(results[1]);
                await data.save();
                res.send("uploaded");
            }
        }else{
            res.send("Incorrect file");
        }
    }catch(e){
        res.status(404).send(e);
    }
}

const searchMedicine = async(req,res) => {
    try{
        const {ser} = req.params;
        // using regex to return everything that matches the searched keyword
        const product = await CsvModel.find({ c_name: new RegExp(ser,"i") }).select('c_name');
        product.length!==0?res.send(product):res.status(402).send("product doesn't exist")
    }catch(e){
        res.status(404).send(e);
    }
}

const sendAll = async(req,res) => {
    try{
        // will return all the medicines
        const products = await CsvModel.find().select('c_name');
        res.send(products);
    }catch(e){
        res.status(404).send(e);
    }
}

const getMedicineDetails = async(req,res) => {
    try{
        const {c_unique_id} = req.params;
        // will return details of one particular medicins which matches it's id
        const data = await CsvModel.find({_id:c_unique_id});
        data ? res.send(data) : res.send("Incorrect id");
    }catch(e){
        res.status(404).send(e);
    }
}

const getOrderDetails = async(req,res) => {
    try{
        const {id} = req.params;
        // will return details of one particular order which matches it's id
        const data = await Order.find({_id:id});
        data ? res.send(data) : res.send("Incorrect id");
    }catch(e){
        res.status(404).send(e);
    }
}

const placeorder = async(req,res) => {
    try{
        const data = req.body;
        const order = new Order({
            order: data
        })
        await order.save();
        res.send({"_id":order._id});
    }catch(e){
        res.status(404).send(e);
    }

}

const getorder = async(req,res) => {
    try{
        // will return all the orders
        const orders = await Order.find();
        res.send(orders);
    }catch(e){
        res.status(404).send(e);
    }
}

const csvToJson = (results,csv) => {
    // splitting based on "\n"
    let list = csv.split('\n');
    for(let i = 1; i < list.length; i++){
        // header will be used as keys for the object
        let header = list[0].split(',');
        let inList = list[i].split(',');
        let hsn_code = '';
        inList[9].split('').map(e=>{
            if(e!=="\r"){
                hsn_code += e;
            }
        })
        let lastHeader = '';
        header[9].split('').map(e=>{
            if(e!=='\r'){
                lastHeader += e;
            }
        })
        results.push({
            [header[0]] : inList[0],
            [header[1]] : inList[1],
            [header[2]] : inList[2],
            [header[3]] : inList[3],
            [header[4]] : inList[4],
            [header[5]] : inList[5],
            [header[6]] : inList[6],
            [header[7]] : inList[7],
            [header[8]] : inList[8],
            [`${lastHeader}`] : hsn_code
        })
    }
    return results;
}
module.exports = {
    uploadCSV,searchMedicine,
    getMedicineDetails,placeorder,
    sendAll,getorder,getOrderDetails
}