import { createRelationInputDTO, Relation } from "../../Model/Relation";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { RelationsRepository } from "./RelationsRepository";

export default class RelationBusiness {
    private idGenerator: IdGenerator;
    private authenticator: Authenticator;
    private relationData: RelationsRepository;

    constructor(
        relationDataImplementation: RelationsRepository
    ){
        this.relationData = relationDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    create = async (inputHeaders: string| undefined, input: createRelationInputDTO) => {
        const token = inputHeaders
        const { userId } = input

        if(!userId){
            throw new Error("Insira todos os campos!")
        }

        if(!token || token === undefined){
            throw new Error("É necessário uma autorização!")
        }

        const authenticator = await this.authenticator.getTokenData(token)
        const id: string = this.idGenerator.generate()
        const user1_id = authenticator.id

        const relation = new Relation(
            id,
            user1_id,
            userId
        )

        const searchRelation = await this.relationData.findById(user1_id, userId)
        const searchRelation2 = await this.relationData.findById(userId, user1_id)

        if(user1_id === userId){
            throw new Error("Você não pode fazer amizade com você mesmo!")
        }

        if(searchRelation || searchRelation2){
            throw new Error("Você já é amigo desta pessoa!")
        }

        const result = await this.relationData.insert(relation)

        return result
    }

    delete = async (inputHeaders: string| undefined, input: string) => {
        const token = inputHeaders
        const userId  = input

        if(!userId){
            throw new Error("Insira todos os campos!")
        }

        if(!token || token === undefined){
            throw new Error("É necessário uma autorização!")
        }

        const authenticator = await this.authenticator.getTokenData(token)
        const user1_id = authenticator.id

        const searchRelation = await this.relationData.findById(user1_id, userId)
        const searchRelation2 = await this.relationData.findById(userId, user1_id)

        if(user1_id === userId){
            throw new Error("Você não pode desfazer amizade com você mesmo!")
        }

        if(searchRelation || searchRelation2){
            await this.relationData.delete(user1_id, input)
            await this.relationData.delete(input, user1_id)
        }

        if(!searchRelation && !searchRelation2){
            throw new Error("Você ainda não possui amizade com essa pessoa!")
        }
    }
}