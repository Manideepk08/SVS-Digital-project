export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const adminUsers: AdminUser[] = [
  {
    id: 'admin-002',
    name: 'Alex',
    email: 'alex@example.com',
    password: 'password123',
  }
]; 