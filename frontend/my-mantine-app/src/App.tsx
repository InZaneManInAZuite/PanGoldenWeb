import { MantineProvider, Card } from '@mantine/core';
import { LoginForm } from './components/LoginForm';
import { theme } from './Theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Card radius='md' shadow='xs' padding='xl' bg='dark'>
      </Card>

      <LoginForm />
    </MantineProvider>
  );
}