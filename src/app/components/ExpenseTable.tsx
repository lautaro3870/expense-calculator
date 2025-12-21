'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Category, Expense } from '../interaface';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState<Expense[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);

  const getExpensesAndCategories = () => {
    const listOfExpenses = window.localStorage.getItem('expenses');
    const listOfCategories = window.localStorage.getItem('categories');
    const expensesConverted = listOfExpenses
      ? JSON.parse(listOfExpenses)
      : [
          {
            id: '1234',
            amount: 100,
            date: '12/12/2025',
            categoryId: 1,
            categoryName: 'Super',
          },
          {
            id: '12345',
            amount: 345,
            date: '12/12/2025',
            categoryId: 2,
            categoryName: 'Super',
          },
        ];
    const categoriesConverted = listOfCategories
      ? JSON.parse(listOfCategories)
      : [
          {
            id: 1,
            category: 'Super',
          },
        ];

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
  };

  useEffect(() => {
    getExpensesAndCategories();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ height: '100%', overflow: 'auto' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gasto</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense: Expense) => (
            <TableRow
              key={expense.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                ${expense.amount}
              </TableCell>
              <TableCell align="right">{expense.categoryName}</TableCell>
              <TableCell align="right">{expense.date}</TableCell>
              <TableCell align="right">
                <Button color="error" variant="contained">
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
