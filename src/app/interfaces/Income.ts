export interface Income {
    id: number | string;
    link: string;
    date: string;
    client: any;
    sum: number;
    currency: string;
    base_document: null | any;
}

export interface NewIncome {
    base?: string;
    client?: string | any;
    sum: number;
}