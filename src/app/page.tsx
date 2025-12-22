'use client';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo';
import { useEffect, useState } from 'react';
import { Category, Expense } from './interaface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getExpensesAndCategories = () => {
    const listOfExpenses = window.localStorage.getItem('expenses');
    const listOfCategories = window.localStorage.getItem('categories');
    const expensesConverted = listOfExpenses ? JSON.parse(listOfExpenses) : [];
    const categoriesConverted = listOfCategories
      ? JSON.parse(listOfCategories)
      : [];

    const finalList = expensesConverted.map((expense: Expense) => {
      const category = categoriesConverted.find(
        (c: Category) => c.id === expense.categoryId
      );
      return {
        ...expense,
        categoryName: category ? category.category : 'Sin categoría',
      };
    });
    setExpenses(finalList);
    setCategories(categoriesConverted);
  };

  const getCurrentDateString = (): string => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const createExpense = (amount: number, category: Category): boolean => {
    if (!amount || !category.category) return false;
    const newExpense: Expense = {
      id: uuidv4(),
      amount,
      date: getCurrentDateString(),
      categoryId: category.id,
      categoryName: category.category,
    };

    setExpenses((prev) => [...prev, newExpense]);
    const newList = expenses.concat(newExpense);
    window.localStorage.setItem('expenses', JSON.stringify(newList));
    return true;
  };

  const deleteExpense = (id: string) => {
    const newList = expenses.filter((e: Expense) => e.id !== id);
    setExpenses(newList);
    window.localStorage.setItem('expenses', JSON.stringify(newList));
  };

  const deleteAllExpenses = () => {
    Swal.fire({
      title: '¿Eliminar todos los gastos?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminados!', '', 'success');
        const newList: Expense[] = [];
        setExpenses(newList);
        window.localStorage.setItem('expenses', JSON.stringify(newList));
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  useEffect(() => {
    getExpensesAndCategories();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
        marginTop: '3rem',
      }}
    >
      <ExpenseForm
        categories={categories}
        createExpense={createExpense}
        deleteAllExpenses={deleteAllExpenses}
      />
      <hr style={{ width: '100%', border: '1px solid' }} />
      <ExpenseInfo />
      <hr style={{ width: '100%', border: '1px solid' }} />
      <br />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        <ExpenseTable
          categories={categories}
          expenses={expenses}
          deleteExpense={deleteExpense}
        />
      </div>
    </div>
  );
}
