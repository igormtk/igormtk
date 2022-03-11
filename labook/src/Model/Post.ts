export class Post {
    constructor (
        private id: string,
        private photo: string,
        private description: string,
        private type: string,
        private created_at: Date,
        private author_id: string
    ){
        this.id = id;
        this.photo = photo;
        this.description = description;
        this.type = type;
        this.created_at = created_at;
        this.author_id = author_id;
    }

        public getId() {
            return this.id
        }
    
        public getPhoto() {
            return this.photo
        }
    
        public getDescription() {
            return this.description
        }
    
        public getType() {
            return this.type
        }
        
        public getCreatedAt() {
            return this.created_at
        }

        public getAuthorId() {
            return this.author_id
        }

        static toUserModel(data: any): Post {
            return new Post(data.id, data.photo, data.description, data.type, data.created_at, data.author_id)
        }
}

export enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
}
 
export type post = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    authorId: string
}

export type createPostInputDTO = {
    photo: string,
    description: string,
    type: POST_TYPES
}

export type paramsInputDTO = {
    inputParams:string
}

export type feedPost = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    authorId: string,
    name: string
}