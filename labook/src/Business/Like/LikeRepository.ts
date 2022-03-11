import { Like } from "../../Model/Like"

export interface LikeRepository{
    insert(post: Like):Promise<Like>
    findById(id: string, id2: string):Promise<Like | null>
    delete(id: string, id2: string):Promise<void>
}