import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio identity', () => {
  render(<App />);
  expect(screen.getByText(/DEVIN COSTER/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Software Engineer/i })).toBeInTheDocument();
});
