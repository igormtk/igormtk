import { Request, Response } from "express"
import PostBusiness from "../../Business/Post/PostBusiness"
import PostData from "../../Data/Post/PostData"
import { createPostInputDTO, POST_TYPES } from "../../Model/Post"

export default class PostController {
    private postBusiness: PostBusiness
    constructor (
    ){
        this.postBusiness = new PostBusiness(new PostData())
    }

    create = async (req: Request, res: Response) => {
        const token = req.headers.authorization

        const { photo, description, type } = req.body

        const input: createPostInputDTO = {
            photo,
            description,
            type
        }

        try {
            const post = await this.postBusiness.create(token, input)
            res.send({message: "Post criado com sucesso!", post})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    find = async (req: Request, res: Response) => {
        const token = req.headers.authorization

        const input = req.params.id

        try {
            const post = await this.postBusiness.find(token, input)
            res.send({post})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    get = async (req: Request, res: Response) => {
        const token = req.headers.authorization

        try {
            const posts = await this.postBusiness.get(token)
            res.send({posts: posts})
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    getPostsByType = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const input = req.params.type as POST_TYPES

        try {
            const posts = await this.postBusiness.getPostsByType(token, input)
            res.send({posts: posts})
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}