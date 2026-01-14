import express from 'express';
const router=express.Router();
import userController from '../controller/userController.js';



router.get('/',userController.loginRender);
router.get('/home',userController.homeRender);
router.get('/register',userController.registerRender)
router.get('/logout',userController.logoutUser);

router.post('/login',userController.loginDirection)
router.post('/register',userController.registerDirection)





export default router;