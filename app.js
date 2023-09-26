const express = require('express');
const app = express();
const db = require('./config/db');
const userController = require('./controllers/userController')
const bodyParser = require('body-parser');
const { error } = require('console');
const { createServer } = require('node:http');
const server = createServer(app);
const session = require('express-session'); 

app.use(session({
    secret:'NFAUOFPI02MC0',
    resave: false,
    saveUninitialized: true,
    cookie:{
      secure:false,
      maxAge: 30 * 60 * 100,
    },  
}));


db.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else{
        server.listen(3000)
    }
});

app.disable('x-powered-by');

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let error = req.session.error;
    req.session.destroy() 
    res.render('index',{ error });
  })

app.post('/', (req, res) => {

    const email = req.body.email; 
    const password = req.body.pass;
    
    userController.verifyUser(email,password,(err,error)=>{
     if(err){
      console.error('error al verificarla',err);
     }
     else if(error){
        req.session.error = error
        res.redirect('/')
     }else{

      userController.registerUser(email, password, (err) => {
        if (err) {
          console.error('Error al insertar usuario:', err);
          res.render('error');
        } else {
            req.session.user = email;
            res.render('room')
        }
      });
     }
    })
})

app.get('/login',(req,res)=>{
    let error = req.session.dato;
    req.session.destroy() 
    res.render('login',{error});
  })
  
  //logearse
  app.get('/room',(req,res)=>{
      if(req.session.user){
        let user = req.session.user
        let error = req.session.dato2
        res.render('room',{ user , error })
      }else{
        res.redirect('login');
      }
     
    }),
  
  app.post('/login',(req,res)=>{
    const email = req.body.email; 
    const password = req.body.pass;
    userController.sessionStart(email,password,(err,auth,error)=>{
    if (err) {
      res.status(500).send('error en la consulta de login')
    } else{
      if(auth){
        req.session.user = email;
        req.session.dato2 = "";
        res.redirect('room');  
      }else{
        req.session.dato = error
        res.redirect('login')
      }
    }
  })
  })





