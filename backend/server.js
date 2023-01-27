const app=require('./app')
const dotenv=require('dotenv');
const connectDb=require(`./config/dbConfig`)

dotenv.config({ path:`backend/config/config.env`});

connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`App started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})