const express = require('express');
const app = express();
const db = require('./config/db');
const userController = require('./controllers/userController')
const mapController = require('./controllers/mapController')
const bodyParser = require('body-parser');
const multer = require('multer');
const { createServer } = require('node:http');
const server = createServer(app);
const session = require('express-session'); 
const cartController = require('./controllers/cartController')
const cache = require('./cache/cache')



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
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
        const error = "ingrese un correo adecuado"
        req.session.error = error
        res.redirect('/')
    }else{
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
                   res.redirect('/room')
               }
             });
            }
           })
    }
    
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
    req.session.user = email;
    
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



const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/room', upload.single('archivoJson'), async (req, res) => {
    const jsonBuffer = req.file.buffer; 
    const jsonString = jsonBuffer.toString('utf8'); 
    const jsonObject = JSON.parse(jsonString); 

    mapController.cacheStartPoint(jsonObject)
    mapController.addNodeJson(jsonObject,(error)=>{})
    mapController.jsonConnectDirect(jsonObject,(error)=>{})

    let error = ""
    res.render('room',{error})
    
});


app.post('/dataN', (req, res) => {
   
    const nombre = req.body.nombre
    const posX = req.body.posX
    const posY = req.body.posY
     
    const nodoObject ={
        ubicaciones:[
            {
                nombre:nombre,
                posX:posX,
                posY:posY,
            }
        ]
    }
    mapController.addNodeJson(nodoObject,(error)=>{
      if(error){
        res.render('room', { error })
      }
      if(error == undefined){
        res.redirect('/room')
      }
  });
  
})
  app.post('/dataC', (req, res) => {
   
    const ubicacion1 = req.body.priUb
    const ubicacion2 = req.body.secUb
    const peso = req.body.peso
     
    const conexionObject ={
        conexiones:[
            {
                ubicacion1:ubicacion1,
                ubicacion2:ubicacion2,
                peso:peso,
            }
        ]
    }
    mapController.addConexionJson(conexionObject,(error)=>{
      console.log(error)
      if(error){
        res.render('room', { error })
      }
      console.log(error,"UND")
      if(error == undefined){
        res.redirect('/room')
      }
    })
   
});


app.post('/carte',(req,res)=>{
  cartController.setLocationData((data)=>{
    cartController.setConecctionData((data2)=>{
      res.render('carte',{ data,data2 })
    })
  })
  
})

app.post('/dj',(req,res)=>{
  cartController.setLocationData((data)=>{
    cartController.setConecctionData((data2)=>{
      cartController.graph(data,data2)
    })
    const inicio = req.body.inicio
    const inicioObj = {inicio:inicio}
    mapController.cacheStartPoint(inicioObj)
  })
})


app.use((req, res) => {
    res.render('notfound');
});




