const User = require ("../models/user-model")
// const bcrypt = require("bcryptjs")



// Home Logic

const home = async (req, res)=>{
try{
 res.status(200).send("welcome to use my router")

} 
catch (error)
{
    console.log(error);
}
};

// User Register Logic

const register = async (req, res)=>{
try{
 console.log(req.body)
  const {username , email, phone, password}=req.body;
        
 const userExist =await User.findOne({email})

 if (userExist){
    return res.status(400).json({message:"email already exists"});
 }

// hash the password
// const saltRound = 10;
// const hash_password = await bcrypt.hash (password , saltRound)
const userCreated = await User.create({username , email, phone, password,});


res.status(201).json ({ message:"registration successful",
    token : await userCreated.generateToken(),
    userId:userCreated._id.toString(),
});
    } 
    catch (error)
    {
        res.status(500).json("internal server error");
    }
    };

// User Login Logic
const login = async (req, res)=>{
try {
  
    const {email , password}= req.body;
    const userExist = await User.findOne({email});
    console.log(userExist);



    if (!userExist){
       return  res.status(400).json({message:"Invalid Credentials"});
     }
    //  const user = await User.create({ email, password});
    //  const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);
     if(user){
      res.status(201).json ({ 
            message:"Login Successful",
    token : await userExist.generateToken(),
    userId: userExist._id.toString(),
});
     }
     else{
        res.status(400).json({message:"Invalid email or password"})
     }

} catch (error) {
    // res.status(500).json("internal server error");
    next(error);
}
}

// * ------------------------------
// to sent user data  - User Logic
// * ------------------------------

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData})
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}

module.exports = {home , register , login , user};