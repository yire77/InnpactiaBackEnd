const express = require('express');
const app = express();
const PORT= 3000;

app.listen(PORT,()=>{
    console.log(`El servidor esta en el puerto http://localhost:${PORT}`)
});

const pool = require('./config/mySql');


const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

const bcryptjs = require('bcryptjs');



app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



const loginRouter = require('./routes/login');
const userRouter = require('./routes/users');
const indicadorRouter = require('./routes/indicador');

app.use('/log', loginRouter);
app.use('/usuario', userRouter);
app.use('/indicador',indicadorRouter);
