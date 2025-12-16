import { TextField } from '@mui/material';
import BasicTable from './components/CustomTable';

export default function Home() {
  return (
    <div>
      <h1>Tabla</h1>
      <form>
        <TextField variant="outlined" />
      </form>
      <div style={{ height: '40rem' }}>
        <BasicTable />
      </div>
    </div>
  );
}
