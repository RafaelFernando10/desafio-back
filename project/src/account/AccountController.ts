import { Request, Response } from "express";
import prisma from "../database/client";

export class AccountController {

    async register(req: Request, res: Response): Promise<void> {
        const { cpf, email, name } = req.body

        const account = await prisma.account.create({
            data: {
                name,
                email,
                cpf,
                balance: 0
            }
        })

        res.json(account)

    }
    async searchBalance(req: Request, res: Response): Promise<void> {

        const idAccount = req.params.id     //pegando id que veio da URL
        const id = parseInt(idAccount)      //transformando id do tipo string para number

        //utilizando metodo do prisma para realizar busca no banco
        const account = await prisma.account.findFirst({
            where: {
                id
            }
        })

        if (account === null) {
            res.status(422).json("Conta não encontrada!")
            return
        }

        res.status(200).json(`Saldo: ${account?.balance}`)
    }

    async deposit(req: Request, res: Response): Promise<void> {

        const idAccount = req.params.id
        const id = parseInt(idAccount)

        const { depositValue } = req.body
        const account = await prisma.account.findFirst({
            where: {
                id
            }
        })

        if (account === null) {
            res.status(422).json("Conta não encontrada!")
            return
        }

        const newBalance = account?.balance + depositValue

        await prisma.account.update({
            where: { id },
            data: { balance: newBalance }
        })

        res.status(200).json(`Saldo: ${newBalance}`)
    }

    async withdraw(req: Request, res: Response): Promise<void> {

        const idAccount = req.params.id
        const id = parseInt(idAccount)

        const { withdrawValue } = req.body

        const account = Object(await prisma.account.findFirst({
            where: {
                id
            }
        })
        )

        if (!account.id) {
            res.status(422).json("Conta não encontrada!")
            return
        }

        if (withdrawValue > account.balance) {
            res.status(422).json("Saldo insuficiente!")
            return
        }

        const newBalance = account?.balance - withdrawValue

        await prisma.account.update({
            where: { id },
            data: { balance: newBalance }
        })

        res.status(200).json(`Saldo: ${newBalance}`)
    }
}



