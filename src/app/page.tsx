import { TextField } from '@mui/material';
import BasicTable from './components/CustomTable';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1>Tabla</h1>
      <form>
        <TextField variant="outlined" />
      </form>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        <BasicTable />
      </div>
    </div>
  );
}
