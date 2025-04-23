export interface IProduct {
    name: string;
    brand: string;
    barCode: string;
    supplier: string;
    stockId: number;
    price: number;
    weight: number;
    measureUnit: string;
}

export interface IProductListParams {
    name: string;
    brand: string;
    supplier: string;
    stockId: number;
}