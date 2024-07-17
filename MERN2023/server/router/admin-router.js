// first step of admin pannel
const express = require ("express");
const adminController = require("../controllers/admin-controller");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router(); 


router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUserById); // for  single user find id edit 
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById) // for edit main 
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById) // for delete
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById) // for conacts delete


module.exports = router;