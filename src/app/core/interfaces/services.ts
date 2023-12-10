export interface Service {
  _id?: string;
  name?: string;
  price?: number;
  icon?: string;
  sub?: number; // [0=> daily, 1=> monthly, 2=> yearly];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Subscription {
  _id?: string;
  type?: 'monthly' | 'daily' | 'yearly';
}

export interface Expense {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
