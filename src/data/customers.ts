export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const customers: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    totalOrders: 5,
    totalSpent: 1500.00,
    joinDate: '2023-01-15',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
    },
  },
  {
    id: 'CUST002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    totalOrders: 8,
    totalSpent: 2750.50,
    joinDate: '2023-02-20',
    address: {
      street: '456 Oak Ave',
      city: 'Someville',
      state: 'NY',
      zipCode: '67890',
    },
  },
  {
    id: 'CUST003',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@example.com',
    phone: '555-123-4567',
    totalOrders: 3,
    totalSpent: 820.00,
    joinDate: '2023-03-10',
    address: {
      street: '789 Pine Ln',
      city: 'Yourtown',
      state: 'TX',
      zipCode: '54321',
    },
  },
  {
    id: 'CUST004',
    name: 'Virat Kohli',
    email: 'virat.kohli@example.com',
    phone: '555-987-6543',
    totalOrders: 12,
    totalSpent: 4500.75,
    joinDate: '2023-04-05',
    address: {
      street: '101 Maple Dr',
      city: 'Histown',
      state: 'FL',
      zipCode: '98765',
    },
  },
  {
    id: 'CUST005',
    name: 'Emily Clark',
    email: 'emily.clark@example.com',
    phone: '321-654-0987',
    totalOrders: 2,
    totalSpent: 420.00,
    joinDate: '2023-05-21',
    address: {
      street: '212 Birch Rd',
      city: 'Herplace',
      state: 'WA',
      zipCode: '13579',
    },
  },
]; 