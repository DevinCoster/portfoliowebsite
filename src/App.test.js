import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio identity', () => {
  render(<App />);
  expect(screen.getAllByText(/DEVIN COSTER/i).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('heading', { name: /Software Engineer/i })).toBeInTheDocument();
});
