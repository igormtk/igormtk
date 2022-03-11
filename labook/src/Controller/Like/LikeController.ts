import { Request, Response } from "express"
import LikeBusiness from "../../Business/Like/LikeBusiness"
import LikeData from "../../Data/Like/LikeData"
import { createLikeInputDTO } from "../../Model/Like"

export default class LikeController {
    private likeBusiness: LikeBusiness
    constructor(
    ){
        this.likeBusiness = new LikeBusiness(new LikeData())
    }

    create = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const { id } = req.body
        
        const input: createLikeInputDTO = {
            postId: id
        }

        try {
            await this.likeBusiness.create(token, input)
            res.send({message: "Você curtiu um post!"})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    delete = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const input = req.params.id

        try {
            await this.likeBusiness.delete(token, input)
            res.send({message: "Você descurtiu o post!"})
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}