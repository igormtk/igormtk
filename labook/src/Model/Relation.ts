export class Relation {
    constructor (
        private id: string,
        private user1_id: string,
        private user2_id: string,
    ){
        this.id = id;
        this.user1_id = user1_id;
        this.user2_id = user2_id;
    }
    public getId() {
        return this.id
    }

        public getId1() {
            return this.user1_id
        }
    
        public getId2() {
            return this.user2_id
        }

        static toUserModel(data: any): Relation {
            return new Relation(data.id, data.user1_id, data.user2_id)
        }
}

export type relation = {
    user1_id: string,
    user2_id: string
}

export type createRelationInputDTO = {
    userId: string
}

