export interface Product {
    id: number | string;
    title: string;
    price: number;
    packCount: number;
    discount: number;
    total: number;
    isMeter: boolean
}