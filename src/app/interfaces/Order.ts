import { Delivery, MovementDelivery } from "./Delivery";
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
    delivery: Delivery
}

export interface MovementOrder {
    id: number | string;
    link: string;
    date: string | Date;
    comment: string;
    products: Product[];
    storageOut: string;
    storageIn: string;
    delivery: MovementDelivery
}

export interface ReturnOrder {
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

export interface PurchaseOrder {
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