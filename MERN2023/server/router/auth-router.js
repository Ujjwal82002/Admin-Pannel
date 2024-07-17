const express = require ("express")
const router = express.Router(); 
const authcontrollers= require("../controllers/auth-controller");
const{signupSchema, loginSchema} = require("../validators/auth-validator")
const authMiddleware = require("../middlewares/authMiddleware")
const validate = require("../middlewares/validate-middleware")

router.route("/").get(authcontrollers.home);

router.route('/register').post(validate(signupSchema),authcontrollers.register);
router.route('/login').post(validate(loginSchema),authcontrollers.login);
   

router.route("/user").get(authMiddleware,authcontrollers.user);


module.exports = router;

