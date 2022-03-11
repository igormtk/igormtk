import { Request, Response } from "express"
import UserBusiness from "../../Business/User/UserBusiness"
import UserData from "../../Data/User/UserData"
import { LoginInputDTO, SignupInputDTO } from "../../Model/User"

export default class UserController {
    private userBusiness: UserBusiness
    constructor (
    ){
        this.userBusiness = new UserBusiness(new UserData())
    }


    signup = async (req: Request, res: Response) => {
        const {name, email, password} = req.body

        const input: SignupInputDTO = {
            name,
            email,
            password
        }

        try {
            const token = await this.userBusiness.signup(input)
            res.send({message: "Usuário Cadastrado com sucesso!", token})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    login = async (req: Request, res: Response) => {
        const {email, password} = req.body

        const input: LoginInputDTO = {
            email,
            password
        }

        try {
            const token = await this.userBusiness.login(input)
            res.send({token})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}