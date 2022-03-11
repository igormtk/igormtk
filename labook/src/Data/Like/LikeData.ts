import { LikeRepository } from "../../Business/Like/LikeRepository"
import { Like } from "../../Model/Like"
import BaseDatabase from "../BaseDatabase"

export default class LikeData extends BaseDatabase implements LikeRepository {
    protected TABLE_NAME = "Labook_Likes"

    insert = async (like: Like) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(like)

            return like
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    findById = async (id: string, postId: string) => {
        try {
            const queryResult: Like[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({user_id: id, post_id: postId})

            return queryResult[0] && Like.toUserModel(queryResult[0])
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    delete = async (id: string, postId: string): Promise<void> =>{
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .delete()
            .where({user_id: id, post_id: postId})

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}