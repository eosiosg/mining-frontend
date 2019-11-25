// 1 add app specific types
export interface Expense {
  id: string;
  description: string;
  note: string;
  amount: number;
  createdAt: number;
}