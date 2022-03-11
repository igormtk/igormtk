import { PostRepository } from "../../Business/Post/PostRepository";
import { Post, POST_TYPES } from "../../Model/Post";
import BaseDatabase from "../BaseDatabase";

export default class PostData extends BaseDatabase implements PostRepository{
    protected TABLE_NAME = "Labook_Posts"

    insert = async (post: Post) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(post)

            return post
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    findById = async (id: string) => {
        try {
            const queryResult: Post[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({id})

            return queryResult[0] && Post.toUserModel(queryResult[0])
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPosts = async(id:string)=> {
        try{
            const queryResult: Post[] = await BaseDatabase
            .connection.raw(`
                SELECT Labook_Posts.id, photo, description, type, created_at, author_id, Labook_Users.name
                FROM Labook_Posts
                JOIN Labook_Users
                ON Labook_Posts.author_id = Labook_Users.id
                JOIN Labook_Relations
                ON Labook_Relations.user2_id = Labook_Posts.author_id
                AND Labook_Relations.user1_id = '${id}'
                ORDER BY created_at DESC
                LIMIT 5
            `)

            return queryResult[0]
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getPostsByEvent = async(id:string, event:POST_TYPES)=> {
        try{
            const queryResult: Post[] = await BaseDatabase
            .connection.raw(`
                SELECT Labook_Posts.id, photo, description, type, created_at, author_id, Labook_Users.name
                FROM Labook_Posts
                JOIN Labook_Users
                ON Labook_Posts.author_id = Labook_Users.id
                JOIN Labook_Relations
                ON Labook_Relations.user2_id = Labook_Posts.author_id
                AND Labook_Relations.user1_id = '${id}'
                WHERE type = '${event}'
                ORDER BY created_at DESC
            `)

            return queryResult[0]
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}