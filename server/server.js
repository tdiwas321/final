//load env variables
require('dotenv').config();

// importing dependencies

const express = require("express");
const db = require("./config/db");
const mongoose = require('mongoose');
const cors = require('cors');
const venue = require('./models/venue');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer')


//create an express ap
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//routing
app.get('/', (req, res) => {
    res.console.log("hello world");;
})

app.use('/user', require('./controllers/userController'))
app.use('/venue',require('./controllers/venueController'))
app.use('/login',require('./controllers/loginController'))
app.use('/contact',require('./controllers/contactController'))
app.use('/filter',require('./controllers/filterController'))
app.use('/uploads', express.static('./uploads'))
app.use('/rate',require('./controllers/ratingController'))
app.use('/bookvenue',require('./controllers/bookController'))
app.use('/changepassword',require('./controllers/passwordController'))
app.use('/userupdate',require('./controllers/userUpdateController'))


//start our server
app.listen(process.env.PORT, () => {
    console.log('Server listening at port ', process.env.PORT)
});