const express = require('express');
const app = express();
// const dbconnection = require('./config/dbC');
// const userController = require('./controllers/userController');
const bodyParser = require('body-parser');


app.listen(3000)

app.disable('x-powered-by');

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/login',(req,res)=>{
    res.render('login')
})



