export interface IUser {
    _id: any;
    name: string;
    gender: string;
    age: string;
    password: string;
    online: boolean;
    messages:[IMessage]
    type:string;
}

export interface IGroup {
    _id: any;
    name: string;
    public: string;
    admin: any;
    groups: [any];
    users: [any];
    messages: [any];
    type:string;
    parent:string

}

export interface IMessage {
    _id:any;
    from: any;
    toUser: any;
    toGroup: any;
    createdOn: string;
    content: string;
    status: string;
}



export interface IUserAuth {
    name: string,
    password: string
}

export interface IClientData {
    users: [IUser]
    groups: [IGroup];
    user: any;
    [key: string]: any;
}





