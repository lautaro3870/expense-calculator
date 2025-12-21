import { TextField } from '@mui/material';
import BasicTable from './components/CustomTable';
import ExpenseForm from './components/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo';

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
      <ExpenseForm />
      <hr style={{ width: '100%', border: '1px solid' }} />
      <ExpenseInfo />
      <hr style={{ width: '100%', border: '1px solid' }} />
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
