import { Comment } from "../../Model/Comment";
import { createCommentInputDTO } from "../../Model/Comment";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { CommentRepository } from "./CommentRepository";


export default class LikeBusiness {
    private idGenerator: IdGenerator;
    private authenticator: Authenticator;
    private commentData: CommentRepository;

    constructor(
        commentDataImplementation: CommentRepository
    ){
        this.commentData = commentDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    create = async (inputHeaders: string| undefined, input: createCommentInputDTO) => {
        const token = inputHeaders
        const { post_id, description } = input

        if(!token || token === undefined){
            throw new Error("É necessário uma autorização!")
        }

        if(!post_id || !description){
            throw new Error("Insira todos os campos!")
        }

        await this.authenticator.getTokenData(token)
        const id: string = this.idGenerator.generate()

        const comment = new Comment(
            id,
            post_id,
            description
        )

        const result = await this.commentData.insert(comment)

        return result
    }
}