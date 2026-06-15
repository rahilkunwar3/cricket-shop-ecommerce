const mangoose = require('mongoose');

const orderItemSchema = new mangoose.Schema({
    productId:{type:mangoose.Schema.Types.ObjectId, ref:'Product', required:true},
    name:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true, default:1},
    image:{type:String, required:true},
});

const orderSchema = new mangoose.Schema({
    userId:{type:mangoose.Schema.Types.ObjectId, ref:'User', required:true},
    items:[orderItemSchema],
    totalAmount:{type:Number, required:true, default:0},
    shippingAddress:{fullName:{type:String, required:true}, address:{type:String, required:true}, city:{type:String, required:true}, postalCode:{type:String, required:true}, country:{type:String, required:true}, phoneNumber:{type:String, required:true}},
    totalPrice:{type:Number, required:true, default:0},
    paymentMethod:{type:String, required:true, enum:['Credit Card', 'E-sewa', 'Khalti', 'Cash on Delivery'], default:'Credit Card'},
    paymentstatus:{type:String, required:true, enum:['Pending', 'Completed', 'Failed'], default:'Pending'},
    status:{type:String, required:true, enum:['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default:'Pending'},
    createdAt:{type:Date, default:Date.now},
});

module.exports = mangoose.model('Order', orderSchema);