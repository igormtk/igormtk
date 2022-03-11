import { Comment } from "../../Model/Comment";

export interface CommentRepository{
    insert(comment: Comment):Promise<Comment>
}