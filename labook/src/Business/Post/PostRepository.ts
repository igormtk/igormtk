import { Post, POST_TYPES } from "../../Model/Post";

export interface PostRepository{
    insert(post: Post):Promise<Post>
    findById(id: string):Promise<Post | null>
    getPosts(id:string):Promise<Post | null>
    getPostsByEvent(id:string, event:POST_TYPES):Promise<Post | null>
}