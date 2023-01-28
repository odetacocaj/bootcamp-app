const app=require('./app')
const dotenv=require('dotenv');
const connectDb=require(`./config/dbConfig`)


process.on('uncaughtException',err=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down server due to uncaught exceptions`);
    process.exit(1)
})

dotenv.config({ path:`backend/config/config.env`});

connectDb();

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