const userController=require('../../controller/userController')
const authenticate=require('../../middleware/authentication')
const express=require('express')
const router=express.Router();

router.post('/user/login',userController.loginUser)
router.post('/user/register',userController.createUser)
router.use(authenticate)
router.get('/user/:id',userController.getUserById)
router.put('/user',userController.updateUser)
router.delete('/user',userController.deleteUser)



module.exports=router

