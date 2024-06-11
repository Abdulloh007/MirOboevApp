export interface Delivery {
    have_delivery: boolean;
    reciver: string;
    reciver_phone: string;
    reciver_address: string;
    deliver: string;
    deliver_phone: string;
    deliver_vehile: string;
    deliver_company: string;
    delivery_status: string;
}

export interface MovementDelivery {
    have_delivery: boolean;
    deliver: string;
    deliver_phone: string;
    deliver_vehile: string;
    deliver_company: string;
    delivery_status: string;
}