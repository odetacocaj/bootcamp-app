const app=require('./app')
const dotenv=require('dotenv');
const connectDb=require(`./config/dbConfig`)
const cloudinary=require('cloudinary');

process.on('uncaughtException',err=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down server due to uncaught exceptions`);
    process.exit(1)
})

dotenv.config({ path:`backend/config/config.env`});

connectDb();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`App started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down sever due to unhandled promise rejection!');
    server.close(()=>{
        process.exit(1)
    })
})