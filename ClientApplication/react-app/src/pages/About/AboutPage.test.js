import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './AboutPage';  // Adjust the path to where your About component is located

// Mock the useTranslation hook from 'react-i18next'
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Mock translation returns the key as the text
  }),
}));

describe('About Component', () => {
  test('renders About component with translation', () => {
    render(<About />);

    // Check if the main title is rendered
    expect(screen.getByText('aboutPage.title')).toBeInTheDocument();
    // Check if the team introduction is rendered
    expect(screen.getByText('aboutPage.teamIntroduction')).toBeInTheDocument();
    expect(screen.getByText('aboutPage.meetTeam')).toBeInTheDocument();
    
    // Check the conclusion and happy reading texts
    expect(screen.getByText('aboutPage.conclusion')).toBeInTheDocument();
  });
  test('checks dynamic styles and colors', () => {
    render(<About />);
    // Check if specific colors are applied (using CSS classes or inline styles)
    const tadasElement = screen.getByText('Tadas');
    expect(tadasElement).toHaveStyle('color: var(--color-lime-light)');
    const dariusElement = screen.getByText('Darius');
    expect(dariusElement).toHaveStyle('color: var(--color-teal-light)');
    const arnasElement = screen.getByText('Arnas');
    expect(arnasElement).toHaveStyle('color: var(--color-purple-light)');
    const adrianElement = screen.getByText('Adrian');
    expect(adrianElement).toHaveStyle('color: var(--color-amber-light)');
  });
});