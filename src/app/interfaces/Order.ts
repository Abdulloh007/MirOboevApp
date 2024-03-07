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
}