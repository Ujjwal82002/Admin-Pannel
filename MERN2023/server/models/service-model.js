// direct makes by mongoose cluster database used by api first step 
const {Schema, model, Mongoose} = require ("mongoose");


const serviceSchema = new Schema({
    service:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    provider:{
        type:String,
        require:true
    },
})

const Service = new model("Service",serviceSchema);


module.exports = Service;