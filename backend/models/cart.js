const mangoose = require('mongoose');

const cartItemSchema = new mangoose.Schema({
    productId:{type:mangoose.Schema.Types.ObjectId, ref:'Product', required:true},
    name:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true, default:1},
    image:{type:String, required:true},
});

const cartSchema = new mangoose.Schema({
    userId:{type:mangoose.Schema.Types.ObjectId, ref:'User', required:true},
    items:[cartItemSchema],
    totalPrice:{type:Number, required:true, default:0},
    createdAt:{type:Date, default:Date.now},
});

// Calculate total price before saving

cartSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.updatedAt = Date.now();
    next();
});

module.exports = mangoose.model('Cart', cartSchema);