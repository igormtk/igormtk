export class Comment {
    constructor(
        private id: string,
        private post_id: string,
        private description: string
    ){
        this.id = id;
        this.post_id = post_id;
        this.description = description
    }
    public getId(){
        return this.id
    }

    public getUserId(){
        return this.post_id
    }

    public getDescription(){
        return this.description
    }

    static toUserModel(data:any): Comment {
        return new Comment(data.id, data.post_id, data.description)
    }
}

export type createCommentInputDTO = {
    post_id: string
    description: string
}