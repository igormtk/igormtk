import { RelationsRepository } from "../../Business/Relations/RelationsRepository";
import { Relation } from "../../Model/Relation";
import BaseDatabase from "../BaseDatabase";

export default class RelationsData extends BaseDatabase implements RelationsRepository {
    protected TABLE_NAME = "Labook_Relations"

    insert = async (relation: Relation) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(relation)

            return relation
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    findById = async (id: string, id2: string) => {
        try {
            const queryResult: Relation[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({user1_id: id, user2_id: id2})

            return queryResult[0] && Relation.toUserModel(queryResult[0])
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    delete = async (id: string, id2: string): Promise<void> =>{
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .delete()
            .where({user1_id: id, user2_id: id2})

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}