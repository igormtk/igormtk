export class User {
    constructor (
        private id: string,
        private name: string,
        private email: string,
        private password: string
    ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

        public getId() {
            return this.id
        }
    
        public getName() {
            return this.name
        }
    
        public getEmail() {
            return this.email
        }
    
        public getPassword() {
            return this.password
        }
    
        static toUserModel(data: any): User {
            return new User(data.id, data.name, data.email, data.password)
        }
}

export type SignupInputDTO = {
    name: string
    email: string
    password: string
}

export type LoginInputDTO = {
    email: string
    password: string
}

export type user = {
    id: string,
    name: string,
    email: string,
    password: string
}