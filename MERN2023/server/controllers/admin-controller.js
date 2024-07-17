// second step of admin pannel
const Contact = require('../models/contact-model');
const User = require('../models/user-model')

const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find({}, {password: 0 });
        console.log(users);
        if(!users || users.length==0){
            return res.status(404).json({message:"No Users Found"});
   
   }

  return res.status(200).json({users});

        } catch (error) {
        next(error);
    }
}
// SINGLE USERS  LOGIC find id for edit in admin pannel
const getUserById = async (req, res) =>{
    try {
        const id = req.params.id;
      const data =  await User.findOne({_id: id},{password: 0})
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
    }

// USERS UPDATE LOGIC
const updateUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateUserdata = req.body;



        const updatedData = await User.updateOne(
            {_id: id},
            {
            $set:updateUserdata,
        }
       
        
        );
        return res.status(200).json(updatedData);
     
    } catch (error) {
        next(error);
    }
}



// USERS DELETE LOGIC
const deleteUserById = async (req, res) =>{
try {
    const id = req.params.id;
    await User.deleteOne({_id: id})
    return res.status(200).json({message:"User Deleted Successfully"});
} catch (error) {
    next(error);
}
}

// get the contact data on the admin pannel
const getAllContacts = async (req, res)=>{
    try {
        const contacts = await Contact.find();
         console.log(contacts);
        if(!contacts || contacts.length==0){
            return res.status(404).json({message:"No Contacts Found"});
   
   }

  return res.status(200).json({contacts});
    } catch (error) {
        next(error); 
    }
}
// Contacts DELETE LOGIC
const deleteContactById = async (req, res) =>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id})
        return res.status(200).json({message:"Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
    }

module.exports= {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById};