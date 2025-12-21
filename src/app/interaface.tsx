export interface Category {
  id: string;
  category: string;
}

export interface Expense {
  id: string;
  amount: number;
  date: string;
  categoryId: string;
  categoryName: string;
}
