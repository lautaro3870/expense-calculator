'use client';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from '../interaface';
import { useState } from 'react';

type ExpenseFormProps = {
  categories: Category[];
  createExpense: (amount: number, category: Category) => void;
};

export default function ExpenseForm({
  categories,
  createExpense,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>({ id: '', category: '' });

  const getFormData = (e: React.FormEvent) => {
    e.preventDefault();
    createExpense(parseFloat(amount), category);
  };

  return (
    <form onSubmit={getFormData}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <TextField
          size="small"
          label="Gasto"
          sx={{ width: '7rem' }}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <FormControl size="small" sx={{ width: '7rem' }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            id="demo-simple-select"
            label="Categoria"
            value={category ? JSON.stringify(category) : ''}
            labelId="demo-simple-select-label"
            onChange={(e) => {
              const value = e.target.value;
              setCategory(JSON.parse(value));
            }}
          >
            {categories.map((c: Category) => (
              <MenuItem value={JSON.stringify(c)} key={c.id}>
                {c.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          <AddIcon />
        </Button>
        <Button variant="contained" color="error">
          <DeleteIcon />
        </Button>
      </Box>
    </form>
  );
}
