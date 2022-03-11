export class Like {
    constructor(
        private id: string,
        private user_id: string,
        private post_id: string,
    ) {
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
    }
    public getId() {
        return this.id
    }

    public getUserId() {
        return this.user_id
    }

    public getPostId() {
        return this.post_id
    }

    static toUserModel(data: any): Like {
        return new Like(data.id, data.user_id, data.post_id)
    }
}

export type createLikeInputDTO = {
    postId: string
}