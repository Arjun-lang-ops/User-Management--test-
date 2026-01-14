import adminController from "../controller/adminController.js";

import express from 'express';
const router=express.Router();


router.get('/',adminController.adminLoginRender);
router.get('/home',adminController.adminHomeRender);

router.get('/logout',adminController.adminLogout)
router.post('/login',adminController.adminLoginDirection)

router.post("/addUser", adminController.adminAddUser)

router.get("/adminDelete/:id", adminController.adminDeleteUser);
router.get('/edit/:id',adminController.adminEditUserLoad);
router.post('/edit/:id',adminController.adminEditUser)


export default router;