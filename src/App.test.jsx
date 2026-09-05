import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the home landing content at /', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /matt krieger/i })
  ).toBeInTheDocument();
});

test('nav exposes Home / Resume / Projects links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  ['Home', 'Resume', 'Projects'].forEach((label) => {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
  });
});
