import { Router } from "express";


const routes = Router();

routes.post('/register',(req,res)=>accountController.register(req,res))
routes.get('/searchBalance',(req,res)=>accountController.searchBalance(req,res))
routes.post('/deposit',(req,res)=>accountController.deposit(req,res))
routes.post('/withdraw',(req,res)=>accountController.withdraw(req,res))



export { routes };