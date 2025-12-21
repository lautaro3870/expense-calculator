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

export default function ExpenseForm() {
  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'center',
          marginBottom: '1rem'
        }}
      >
        <TextField size="small" label="Gasto" sx={{ width: '7rem' }} type='number'/>
        <FormControl size="small" sx={{ width: '7rem' }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            id="demo-simple-select"
            label="Categoria"
          >
            <MenuItem value={10}>Super</MenuItem>
            <MenuItem value={20}>Bar</MenuItem>
            <MenuItem value={30}>Café</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">
          <AddIcon />
        </Button>
        <Button variant="contained" color="error">
          <DeleteIcon />
        </Button>
      </Box>
    </form>
  );
}
