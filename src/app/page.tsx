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
  const expenseInputId = 'expense-input';

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

  const updateAnnualReport = (expense: Expense) => {
    const report = JSON.parse(localStorage.getItem('expensesReport') || '{}');

    const date = new Date(expense.timestamp);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`;

    if (!report[monthKey]) {
      report[monthKey] = {};
    }

    if (!report[monthKey][expense.categoryId]) {
      report[monthKey][expense.categoryId] = {
        categoryId: expense.categoryId,
        categoryName: expense.categoryName,
        total: 0,
      };
    }

    report[monthKey][expense.categoryId].total += expense.amount;

    localStorage.setItem('expensesReport', JSON.stringify(report));
  };

  const createExpense = (amount: number, category: Category): boolean => {
    if (!amount || !category?.id) return false;

    // const now = new Date(2025, 6, 10);
    const now = new Date();

    const newExpense: Expense = {
      id: uuidv4(),
      amount: Number(amount.toFixed(3)),
      date: now.toISOString(),
      categoryId: category.id,
      categoryName: category.category,
      timestamp: now.getTime(),
    };

    setExpenses((prev) => {
      const updatedExpenses = [newExpense, ...prev];
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
    updateAnnualReport(newExpense);
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
    document.getElementById(expenseInputId)?.focus();
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
        expenseInputId={expenseInputId}
      />
      <hr style={{ width: '100%', border: '1px solid' }} />
      <ExpenseInfo expenses={expenses} />
      <hr style={{ width: '100%', border: '1px solid' }} />
      <br />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          marginBottom: '3rem',
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
