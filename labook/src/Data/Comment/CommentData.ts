import { CommentRepository } from "../../Business/Comment/CommentRepository"
import BaseDatabase from "../BaseDatabase"
import { Comment } from "../../Model/Comment"

export default class CommentData extends BaseDatabase implements CommentRepository {
    protected TABLE_NAME = "Labook_Comments"

    insert = async (comment: Comment) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(comment)

            return comment
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}