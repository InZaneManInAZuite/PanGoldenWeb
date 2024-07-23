import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { Theme } from './Theme';
import { Navigator } from './components/Navigator/Navigator';

export default function App() {
  return (
    <MantineProvider theme={Theme}>
      <Router />
    </MantineProvider>
  );
}
