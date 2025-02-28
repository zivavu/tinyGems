import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Typography } from './Typography';

describe('Typography Component', () => {
  it('renders with default variant p', () => {
    render(<Typography>Test Text</Typography>);
    const element = screen.getByText('Test Text');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('text-base');
    expect(element).toHaveClass('text-text-muted');
  });

  it('renders h1 variant correctly', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const element = screen.getByText('Heading 1');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('text-6xl');
    expect(element).toHaveClass('font-bold');
    expect(element).toHaveClass('text-text');
  });

  it('renders small variant correctly', () => {
    render(<Typography variant="small">Small Text</Typography>);
    const element = screen.getByText('Small Text');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('text-sm');
    expect(element).toHaveClass('text-text-muted');
  });

  it('applies custom className correctly', () => {
    render(<Typography className="custom-class">Custom Styled Text</Typography>);
    const element = screen.getByText('Custom Styled Text');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('text-base');
  });
});
