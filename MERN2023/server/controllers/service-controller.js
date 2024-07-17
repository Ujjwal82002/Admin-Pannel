// third step of database making with api
const { response } = require("express");
const Service = require ("../models/service-model")



const services = async (req, res)=>{
    try{
        const response = await Service.find();
        if(!response)
         {
            // handle the case where no document was found
     res.status(404).json({message: "No service found" });
     return;
    }

    res.status(200).json({message:response});
}
    catch (error)
    {
        console.log(`services: ${error}`);
    }
    };

    module.exports = services;