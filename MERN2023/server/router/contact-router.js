const express = require ("express")
const router = express.Router(); 
const contactForm = require("../controllers/contact-controller");
const{connectSchema} = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware")


// router.route("/contact").post(contactForm);



router.route('/contact').post(validate(connectSchema),contactForm);
module.exports = router;