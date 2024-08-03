import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { Theme } from './Theme';
import { store, persistor } from './App/Store';
import '@mantine/dates/styles.css';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={Theme}>
          <Router />
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}
