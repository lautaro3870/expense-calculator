export interface Category {
  id: number;
  category: string;
}

export interface Expense {
  id: string;
  amount: number;
  date: string;
  categoryId: number;
  categoryName: string;
}
