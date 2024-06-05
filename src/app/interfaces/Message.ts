export interface Message {
    date: string|Date;
    id: number;
    status: string;
    text: string;
    user: string;
    is_my: boolean;
    file?: any;
    file_name?: string;
    file_type?: string;
    reply_id?: string;
}

export interface NewMessage {
    text: string;
    file?: any;
    file_name?: string;
    file_type?: string;
    reply_id?: string;
}