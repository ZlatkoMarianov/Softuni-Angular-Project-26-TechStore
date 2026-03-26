export interface User {
    _id: string;
    username: string;
    email: string;
    favorites: string[];
    created_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}