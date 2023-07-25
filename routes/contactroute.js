const router=require('express').Router();
// const {auth}=require("../middleware/auth")

const {getcontacts,updatecontact,deletecontact,createcontact,getcontact}=require('../controller/contactcontroller')
router.route('/').get(getcontacts).post(createcontact);
router.route('/:id').put(updatecontact).delete(deletecontact).get(getcontact);

module.exports=router;