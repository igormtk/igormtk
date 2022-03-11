import { Request, Response } from "express"
import CommentBusiness from "../../Business/Comment/CommentBusiness"
import CommentData from "../../Data/Comment/CommentData"
import { createCommentInputDTO } from "../../Model/Comment"


export default class LikeController {
    private commentBusiness: CommentBusiness
    constructor(
    ){
        this.commentBusiness = new CommentBusiness(new CommentData())
    }

    create = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const { post_id, description } = req.body
        
        const input: createCommentInputDTO = {
            post_id: post_id,
            description: description
        }

        try {
            await this.commentBusiness.create(token, input)
            res.send({message: "Você adicinou um comentário ao post!"})
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}