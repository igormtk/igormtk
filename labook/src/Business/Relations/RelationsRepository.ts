import { Relation } from "../../Model/Relation";

export interface RelationsRepository{
    insert(post: Relation):Promise<Relation>
    findById(id: string, id2: string):Promise<Relation | null>
    delete(id: string, id2: string):Promise<void>
}