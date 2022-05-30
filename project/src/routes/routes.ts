import { Router } from "express";
import { AccountController } from "../account/AccountController";

const routes = Router();
const accountController = new AccountController()

routes.post('/register',(req,res)=>accountController.register(req,res))
routes.get('/searchBalance/:id',(req,res)=>accountController.searchBalance(req,res))
//routes.post('/deposit',(req,res)=>accountController.deposit(req,res))
//routes.post('/withdraw',(req,res)=>accountController.withdraw(req,res))



export { routes };