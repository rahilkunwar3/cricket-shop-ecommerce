const mangoose = require('mongoose');

const taskSchema = new mangoose.Schema({
    title:{type:String, required:true},
    description:{type:String},
    completed:{type:Boolean, default:false},
    userId:{type:mangoose.Schema.Types.ObjectId, ref:'User', required:true},
    createdAt:{type:Date, default:Date.now},
});

module.exports = mangoose.model('Task', taskSchema);