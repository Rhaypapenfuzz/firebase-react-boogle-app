import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders START A NEW GAME! text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/START A NEW GAME!/i);
  expect(linkElement).toBeInTheDocument();
});
