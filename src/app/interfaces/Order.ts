import { Product } from "./Product";

export interface Order {
    id: number | string;
    link: string;
    date: string | Date;
    comment: string;
    products: Product[];
    sum: number;
    discountSum: number;
    client?: any;
    master?: any;
    currency: any;
}

export interface MovementOrder {
    id: number | string;
    link: string;
    date: string | Date;
    comment: string;
    products: Product[];
    storageOut: string;
    storageIn: string;
}