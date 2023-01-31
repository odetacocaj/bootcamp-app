const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const errorMiddleware=require('./middlewares/errors');
dotenv.config({ path:`backend/config/config.env`});
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')





app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(fileUpload());


//routes

const products=require('./routes/product');
const auth=require('./routes/user');
const order=require('./routes/order');
const payment=require('./routes/payment');


app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);
app.use('/api/v1',payment);



app.use(errorMiddleware);
module.exports=app