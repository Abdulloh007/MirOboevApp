export interface Product {
    id: number | string;
    title: string;
    nick?: string;
    price: number;
    packCount: number;
    discount: number;
    total: number;
    isMeter: boolean;
    unit?: string;
}