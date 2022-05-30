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
    async searchBalance(req:Request,res:Response):Promise<void>{
       
        const idAccount = req.params.id     //pegando id que veio da URL
        const id = parseInt(idAccount)      //transformando id do tipo string para number

        //utilizando metodo do prisma para realizar busca no banco
        const account= await prisma.account.findFirst({
            where:{
                id
            }
        })

    res.status(200).json(`Saldo: ${account?.balance}`)

    }

    async deposit(req:Request,res:Response):Promise<void>{
    
        const idAccount = req.params.id
        const id = parseInt(idAccount)

        const {depositValue} = req.body

       // const depositValueNumber = req.params.depositValue


        const account= await prisma.account.findFirst({
            where:{
                id
            }
        })

        const newBalance = account?.balance + depositValue

        await prisma.account.update({
            where:{id},
            data:{balance:newBalance}
        })

        res.status(200).json(`Saldo: ${newBalance}`)




    }

}
