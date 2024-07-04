// Create a navigator between components for app.tsx

import React from 'react';
import { Button, TextInput, Text } from '@mantine/core';

export default function Navigator() {
  return (
    <div>
      <Button>Log In</Button>
      <Button>Sign Up</Button>
    </div>
  );
}