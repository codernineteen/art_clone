//---------------------------------------------------------------------
//basic setting

require('dotenv').config()
require('express-async-errors');
const express = require('express');
const app = express();

//---------------------------------------------------------------------

//databse
const connectDB = require('./db/connectDB');
//log
const morgan = require('morgan');
//errors
const notFoundErrorMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//router
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const noticeRouter = require('./routes/noticeRoutes');
const archiveRouter = require('./routes/archiveRoutes');
//security;
const cookieParser = require('cookie-parser');
//image uploader
//path
const path = require('path');
const { appendFile } = require('fs');
//authMiddleware
const {authentication, authorizePermission} = require('./middleware/authenticate')
//bodyparser
const bodyParser = require('body-parser')

//---------------------------------------------------------------------

//template engine
app.set('view engine', 'ejs')

//---------------------------------------------------------------------
//total middlewares

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//log
app.use(morgan('dev'));
//data format, static assets
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', express.static(path.join(__dirname, '../public')));
//cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

//---------------------------------------------------------------------

//--routes
//home
app.get('/', (req, res) => {
    res.send('home')
})
//login
app.use('/auth', authRouter)
app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'));
});
app.use('/user', userRouter)

app.get('/products/create', 
    authentication, 
    authorizePermission('devADMIN'),
    (req, res) => {
        res.sendFile(path.join(__dirname, './public/product-create.html'))
    }
)
app.use('/products', productRouter)
app.use('/notice', noticeRouter)

app.get('/archives/lookbook/create', 
    authentication, 
    authorizePermission('devADMIN'),
    (req, res) => {
        res.sendFile(path.join(__dirname, './public/lookbook-create.html'))
    }
)
app.use('/archives/lookbook', archiveRouter)


app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);



//---------------------------------------------------------------------

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening`))
    } catch(err) {
        console.log(err)
    }
}

start();
