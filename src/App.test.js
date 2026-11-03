import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra la página de inicio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /el tiempo define/i })).toBeInTheDocument();
});
