const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const {
    uploadCSV,searchMedicine,
    getMedicineDetails,placeorder,
    sendAll,getorder,getOrderDetails
} = require('./modules/saveoModules.js');
const app = express();

mongoose.connect(process.env.URL,{useUnifiedTopology:true,useNewUrlParser:true});
const con = mongoose.connection
con.on("open",()=>console.log("MongoDB is connected"));

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("working");
})
var upload = multer();
app.post('/uploadCSV',upload.single('file'),uploadCSV);

app.get('/searchMedicine/:ser',searchMedicine);

app.get('/searchMedicine',sendAll);

app.get('/getMedicineDetails/:c_unique_id',getMedicineDetails);

app.post('/placeorder',placeorder);

app.get('/getorder',getorder);

app.get('/getorder/:id',getOrderDetails);

const port = process.env.PORT || 5000 ;
app.listen(port,()=>console.log(`Listening in port : ${port}`));