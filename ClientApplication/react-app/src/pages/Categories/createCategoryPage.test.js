import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateCategory from './createCategoryPage';
import { useTranslation } from 'react-i18next';  // Mock the translation hook
import { ReturnToCategoriesButton, CreateEditCategory } from '../../.components/.MainComponentsExport'; // Mock components

// Mock react-i18next translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Return the key as a placeholder for translation
  }),
}));

// Mock necessary components
jest.mock('../../.components/.MainComponentsExport', () => ({
  ReturnToCategoriesButton: jest.fn(() => <button>Return to Categories</button>),
  CreateEditCategory: jest.fn(() => <form>Category Form</form>),
}));

describe('CreateCategory Component', () => {
  

  test('renders the category creation heading', () => {
    render(<CreateCategory />);

    // Check if the category creation heading is rendered
    expect(screen.getByText('categories.createCategory')).toBeInTheDocument();
  });

});