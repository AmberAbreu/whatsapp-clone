export interface IMessage {
    name: "string";
    message: "string";
    timestamp: "string";
    receiver: boolean;
}

export interface IUser {
    userName: string | null;
    userEmail: string | null;
}
