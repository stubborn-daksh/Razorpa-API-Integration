//import express and call immediately
const app = require('express')();
//configure dotenv package
require("dotenv").config();

const paymentRoute = require('./routes/paymentRoute');

app.use('/',paymentRoute);

app.listen(3000, function(){
    console.log('Server is running');
});