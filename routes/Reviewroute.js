const router=require('express').Router();


const {getreviews,getallreviews,deletereview,createreview}=require('../controller/reviewcontroller')
router.route('/').get(getreviews).post(createreview)
router.route('/all').get(getallreviews)
router.route('/:id').delete(deletereview);

module.exports=router;