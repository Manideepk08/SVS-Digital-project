export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Completed' | 'Cancelled';
  total: number;
  items: { id: string; name: string; quantity: number; price: number }[];
}

export const orders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    date: '2023-10-26',
    status: 'Completed',
    total: 450.00,
    items: [
      { id: 'P001', name: 'Standard Visiting Cards', quantity: 2, price: 225.00 },
    ],
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    date: '2023-10-25',
    status: 'Shipped',
    total: 1250.50,
    items: [
      { id: 'P002', name: 'Bill Book', quantity: 5, price: 150.10 },
      { id: 'P003', name: 'Academic Calendar', quantity: 5, price: 100.00 },
    ],
  },
  {
    id: 'ORD003',
    customerName: 'Rohit Sharma',
    date: '2023-10-24',
    status: 'Pending',
    total: 320.00,
    items: [
      { id: 'P004', name: 'Matte Visiting Cards', quantity: 1, price: 320.00 },
    ],
  },
    {
    id: 'ORD004',
    customerName: 'Virat Kohli',
    date: '2023-10-22',
    status: 'Completed',
    total: 780.75,
    items: [
      { id: 'P001', name: 'Standard Visiting Cards', quantity: 3, price: 260.25 },
    ],
  },
  {
    id: 'ORD005',
    customerName: 'Emily Clark',
    date: '2023-10-21',
    status: 'Cancelled',
    total: 210.00,
    items: [
      { id: 'P005', name: 'Envelope', quantity: 2, price: 105.00 },
    ],
  },
    {
    id: 'ORD006',
    customerName: 'Michael Brown',
    date: '2023-10-20',
    status: 'Shipped',
    total: 99.99,
    items: [
      { id: 'P002', name: 'Bill Book', quantity: 1, price: 99.99 },
    ],
  },
]; 