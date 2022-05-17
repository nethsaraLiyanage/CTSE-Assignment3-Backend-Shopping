// app imports  
const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

//route imports
const cartR = require('./routes/cartRoutes')


//other consts
const PORT = 8000;
const MONGODB_URI = "mongodb+srv://uditha:1qaz2wsx@cluster0.ic3ct.mongodb.net/abc_shop?retryWrites=true&w=majority";

//Middleware
dotenv.config();
const app = express();
app.use(bodyParser.json())
app.use(cors())

app.use('/cart',cartR)


mongoose.connect(
    MONGODB_URI,
    {useNewUrlParser: true , useUnifiedTopology:true},
    () =>{
        console.log("connected to the database")
    }
)

app.use('/', function(req,res){
    res.send("checking routings - app is up and running")
});

//server start
app.listen(PORT, () =>{
    console.log('server is at', PORT);
});