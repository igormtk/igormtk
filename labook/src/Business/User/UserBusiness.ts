import { LoginInputDTO, SignupInputDTO, User } from "../../Model/User";
import { HashManager } from "../../Services/hashManager";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { UserRepository } from "./UserRepository";

export default class UserBusiness {
    private idGenerator: IdGenerator;
    private hashManager: HashManager;
    private authenticator: Authenticator;
    private userData: UserRepository

    constructor(
        userDataImplementation: UserRepository
    ){
        this.userData = userDataImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    signup = async (input: SignupInputDTO) => {
        const {name, email, password} = input

        if(!name || !email || !password){
            throw new Error("Insira todos os campos!")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if(registeredUser){
            throw new Error("Email já cadastrado!")
        }

        const id:string = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword
        )

        await this.userData.insert(user)
        const token = this.authenticator.generateToken({id})

        return token
    }

    login = async (input: LoginInputDTO) => {
        let statusCode = 400
        const {email, password} = input

        if(!email || !password){
            statusCode = 406
            throw new Error("Insira todos os campos!")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if(!registeredUser){
            statusCode = 401
            throw new Error("O E-mail ainda não é cadastrado!")
        }
        
        const hashedPassword = registeredUser.getPassword()
        const id = registeredUser.getId()

        const comparedPassword: boolean = await this.hashManager.compareHash(password, hashedPassword)

        if (!comparedPassword) {
            statusCode = 401
            throw new Error("Senha inválida!")
        }

        const token = this.authenticator.generateToken({id})

        return token
    }
}