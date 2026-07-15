import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App>', () => {
  it('рендерит заголовок приложения', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /ZenAir КП/i })).toBeInTheDocument();
  });
});
