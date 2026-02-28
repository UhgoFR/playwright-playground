export interface Product {
  name: string;
  price: string;
  description: string;
  id: string;
}

export interface User {
  username: string;
  password: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export enum SortOptions {
  NAME_A_TO_Z = 'az',
  NAME_Z_TO_A = 'za',
  PRICE_LOW_TO_HIGH = 'lohi',
  PRICE_HIGH_TO_LOW = 'hilo'
}

export enum TestUsers {
  STANDARD_USER = 'standard_user',
  LOCKED_OUT_USER = 'locked_out_user',
  PROBLEM_USER = 'problem_user',
  PERFORMANCE_GLITCH_USER = 'performance_glitch_user',
  ERROR_USER = 'error_user',
  VISUAL_USER = 'visual_user'
}

export const DEFAULT_PASSWORD = 'secret_sauce';
