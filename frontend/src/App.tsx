import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { Theme } from './Theme';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './App/Store';
import { Provider } from 'react-redux';


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
