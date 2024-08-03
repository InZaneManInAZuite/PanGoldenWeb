import { Missing } from '../components/Missing/Missing';
import { Paper } from '@mantine/core';

export const PageNotFound = () => {
  return (
    <Paper mt="xl" p="xl">
      <Missing text="Error 404: Page Not Found" />
    </Paper>
  );
};
