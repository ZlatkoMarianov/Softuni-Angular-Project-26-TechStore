export interface Comment {
    _id: string;
    text: string;
    author: {
        _id: string;
        username: string;
    };
    productId: string;
    created_at: string;
}