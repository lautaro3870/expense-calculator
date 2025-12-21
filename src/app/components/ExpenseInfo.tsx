'use client';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function ExpenseInfo() {
  const getDaysOfTheMonth = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    getDaysOfTheMonth();
  }, []);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: 200 }}
      >
        <Typography variant="body1">Gastado: </Typography>
        <Typography>$50</Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: 200 }}
      >
        <Typography variant="body1">Total a gastar: </Typography>
        <Typography>$1000</Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: 200 }}
      >
        <Typography variant="body1">Restante a gastar: </Typography>
        <Typography>$50</Typography>
      </Box>
    </Box>
  );
}
