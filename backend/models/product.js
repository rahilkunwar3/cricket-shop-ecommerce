const mangoose = require('mongoose');

const productSchema = new mangoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true},
    category:{type:String, required:true, enum:['Bats', 'Balls', 'Gloves', 'Stumps', 'Protective Gear', 'Clothing', 'Footwear', 'Accessories']},
    brand:{type:String,required:true},
    image:{type:String,required:true},
    stock:{type:Number, required:true, default:0},
    numReviews:{type:Number, default:0},
    isAvailable:{type:Boolean, default:true},
    rating:{type:Number, default:0},
    userId:{type:mangoose.Schema.Types.ObjectId, ref:'User', required:true},
    createdAt:{type:Date, default:Date.now},
});

module.exports = mangoose.model('Product', productSchema);