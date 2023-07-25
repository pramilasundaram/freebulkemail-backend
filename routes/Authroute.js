const router = require('express').Router();
const {auth}=require("../middleware/auth")
//import contact controller
const {login,register, forgotPassword,resetPassword,getme,getallusers}=require("../controller/authController")
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forgotpassword").post( forgotPassword)
router.route("/resetpassword/:userId/:token").post( resetPassword)
router.route("/getme").get(auth,getme)
router.route("/users").get(getallusers)


module.exports = router;