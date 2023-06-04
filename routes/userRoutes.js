import express from "express";
import { Login, addProduct, check_RegisterEmail, check_RegisterNumber, deleteProduct, register } from "../controllers/userControllers.js";
import { Checkemail } from "../middleware/authMiddleware.js";
const router=express.Router(); 
 
router.post('/register',Checkemail,register)
router.post('/check_RegisterEmail',Checkemail,check_RegisterEmail)
router.post("/check_RegisterNumber",check_RegisterNumber)
router.post("/Login",Login)
router.post("/addProduct",addProduct)
router.post("/deleteProduct",deleteProduct)

export default router;