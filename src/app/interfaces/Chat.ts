import { Message } from "./Message";

export interface Chat {
    id: string;
    avatar: string|null;
    companion?: string;
    companions: any[];
    members: any[];
    status: string;
    title: string;
    type: string;
    me: any;
}

