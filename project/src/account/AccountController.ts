import { Request, Response } from "express";

export class AccountController{

    async register(req:Request,res:Response):Promise<void>{
        const {cpf,email,name}=req.body
        res.json({name,cpf,email})

    }
}