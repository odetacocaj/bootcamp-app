const mongoose=require('mongoose')

const productSchema=new mongoose.Mongoose.Schema({
    name:{
        type:String,
       required:[true,'Please enter product name'],
        trim:true,
        maxLength:[100,'Please enter a product name with max 100 characters']
    },
    price:{
        type:Number,
       required:[true,'Please enter product price'],
        maxLength:[5,'Please enter a product price with max 5 digits'],
        default:0.0
    },
    description:{
        type:String,
       required:[true,'Please enter product description'], 
    
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },

        }
    ],
    category:{
        type:String,
        required:[true,'Select product category']
    }
})

module.exports=mongoose.model('Product',productSchema);