export type ProductCategory = 'Phone' | 'Laptop' | 'Tablet' | 'Accessory';

export interface Product {
    _id: string;
    name: string;
    price: number;
    category: ProductCategory;
    imageUrl: string;
    description: string;
    owner: {
        _id: string;
        username: string;
        email: string;
    };
    created_at: string;
}