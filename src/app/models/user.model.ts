export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
  isPermanentCustomer: boolean;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
