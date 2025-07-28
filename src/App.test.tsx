import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders desktop icons', () => {
  render(<App />);
  const aboutIcon = screen.getByText(/About Me/i);
  expect(aboutIcon).toBeInTheDocument();
});
