import { Request, Response } from "express";
import prisma from "../database/client";

export class AccountController{

    async register(req:Request,res:Response):Promise<void>{
        const {cpf,email,name}=req.body

        const account= await prisma.account.create({
            data:{
                name,
                email,
                cpf,
                balance:0
            }
        })

        res.json(account)

    }
}