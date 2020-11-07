'use strict';

require('dotenv').config();
const express = require('express');
let superagent = require('superagent');
let pg = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
let methodOverride = require('method-override');


const app = express();


// Use this as a talking point about environment variables
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

// Set the view engine for templating
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


app.get('/',(req,res)=>{

    res.render('index');

});
app.listen(PORT,()=>{
  console.log(`app is listning on port${PORT}`);
});