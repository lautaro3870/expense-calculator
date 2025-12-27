'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Category, MonthlyCategoryReport } from '../interaface';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function Report() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expensesReport, setExpensesReport] = useState<MonthlyCategoryReport[]>(
    []
  );
  const [totalAmountSpent, setTotalAmountSpent] = useState('');
  const stickyColumnWidth = 70;

  const getHeaderAndRowStyle = (zIndex: number = 3) => {
    return {
      position: 'sticky',
      left: 0,
      width: stickyColumnWidth,
      minWidth: stickyColumnWidth,
      maxWidth: stickyColumnWidth,
      backgroundColor: 'background.paper',
      boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
      zIndex,
    };
  };

  const getMonth = (date: string) => {
    const month = date.split('-');
    const months: { [key: string]: string } = {
      '01': 'Enero',
      '02': 'Febrero',
      '03': 'Marzo',
      '04': 'Abril',
      '05': 'Mayo',
      '06': 'Junio',
      '07': 'Julio',
      '08': 'Agosto',
      '09': 'Septiembre',
      '10': 'Octubre',
      '11': 'Noviembre',
      '12': 'Diciembre',
    };
    return months[month[1] as string];
  };

  const getReportFromStorage = (): MonthlyCategoryReport[] => {
    const raw = localStorage.getItem('expensesReport');
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    return Object.entries(parsed)
      .map(([month, categories]) => ({
        month,
        categories: Object.values(
          categories as {
            categoryId: string;
            categoryName: string;
            total: number;
          }[]
        ),
      }))
      .sort((a, b) => b.month.localeCompare(a.month));
  };

  const calculateTotalSpent = (report: MonthlyCategoryReport[]): number => {
    return report.reduce((acc, month) => {
      const monthTotal = month.categories.reduce(
        (sum, category) => sum + category.total,
        0
      );
      return acc + monthTotal;
    }, 0);
  };

  useEffect(() => {
    const listOfCategories = localStorage.getItem('categories');
    setCategories(listOfCategories ? JSON.parse(listOfCategories) : []);
    const report = getReportFromStorage();
    setExpensesReport(report);
    const total = calculateTotalSpent(report);
    setTotalAmountSpent(total.toString());
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
      <Typography sx={{ margin: '0 auto', marginBottom: '1rem' }}>
        Total gastado: ${totalAmountSpent || 0}
      </Typography>
      <hr style={{ width: '100%', marginBottom: '1rem' }} />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ height: '100%', overflow: 'auto', maxWidth: '100%' }}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={getHeaderAndRowStyle()}>Mes</TableCell>
                {categories.map((category) => (
                  <TableCell key={category.id} align="right">
                    {category.category}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <strong>Total</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expensesReport.map((expense) => {
                let monthTotal = 0;

                return (
                  <TableRow key={expense.month}>
                    <TableCell
                      sx={getHeaderAndRowStyle(2)}
                      component="th"
                      scope="row"
                    >
                      {getMonth(expense.month)}
                    </TableCell>

                    {categories.map((category) => {
                      const categoryData = expense.categories.find(
                        (c) => c.categoryId === category.id
                      );

                      const value = categoryData ? categoryData.total : 0;
                      monthTotal += value;

                      return (
                        <TableCell key={category.id} align="right">
                          {value}
                        </TableCell>
                      );
                    })}

                    <TableCell align="right">
                      <strong>{monthTotal}</strong>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
