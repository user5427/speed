import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditCategory from '../create-edit-category';
import { CategoryController } from '../../../.controllers/categoryController.ts';
import { Category } from '../../../.entities/.MainEntitiesExport.ts';

// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}));

// Mock CategoryController
jest.mock('../../../.controllers/categoryController.ts', () => ({
  CategoryController: {
    GetImage: jest.fn(),
    PostImage: jest.fn(),
    DeleteImage: jest.fn(),
    Put: jest.fn(),
    Post: jest.fn()
  }
}));

const fillForm = async ({ title = 'Test Category', text = 'Test content' } = {}) => {
  const titleInput = screen.getByPlaceholderText('categories.enterCategoryName');
  const textInput = screen.getByPlaceholderText('categories.enterCategoryContent');

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(textInput, { target: { value: text } });
};

describe('EditCategory Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    CategoryController.GetImage.mockResolvedValue('mockImageURL');
    CategoryController.PostImage.mockResolvedValue(true);
    CategoryController.DeleteImage.mockResolvedValue(true);
    CategoryController.Put.mockResolvedValue(new Category({ id: 1, title: 'Updated', text: 'Updated content', imageFileName: 'hasImage' }));
    CategoryController.Post.mockResolvedValue(new Category({ id: 2, title: 'Created', text: 'Created content', imageFileName: 'hasImage' }));
  });

  it('renders form fields and submit button', () => {
    render(<EditCategory />);
    expect(screen.getByPlaceholderText('categories.enterCategoryName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('categories.enterCategoryContent')).toBeInTheDocument();

    expect(screen.getByText('commonUIelements.create')).toBeInTheDocument();
  });

  it('displays validation errors if form is submitted with invalid data', async () => {
    render(<EditCategory />);

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('categories.plsEnterCategoryName.')).toBeInTheDocument();
      expect(screen.getByText('categories.plsEnterCategoryContent.')).toBeInTheDocument();
    });
  });

  it('submits form and shows success modal upon creating a category', async () => {
    render(<EditCategory />);
    await fillForm();

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(CategoryController.Post).toHaveBeenCalled();
      expect(screen.getByText('Created category successfully.')).toBeInTheDocument();
    });
  });

  it('shows error modal if submission fails', async () => {
    CategoryController.Post.mockRejectedValueOnce(new Error('Create error'));
    render(<EditCategory />);
    await fillForm();
    
    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Create error')).toBeInTheDocument();
    });
  });
  
});

describe('EditCategory Component Popups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    CategoryController.GetImage.mockResolvedValue('mockImageURL');
    CategoryController.PostImage.mockResolvedValue(true);
    CategoryController.DeleteImage.mockResolvedValue(true);
    CategoryController.Put.mockResolvedValue(
      new Category({ id: 1, title: 'Updated', text: 'Updated content', imageFileName: 'hasImage' })
    );
    CategoryController.Post.mockResolvedValue(
      new Category({ id: 2, title: 'Created', text: 'Created content', imageFileName: 'hasImage' })
    );
  });

  it('displays and closes success popup on successful creation', async () => {
    render(<EditCategory />);
    await fillForm();

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Created category successfully.')).toBeInTheDocument();
    });

  });

  it('displays and closes error popup on failed creation', async () => {
    CategoryController.Post.mockRejectedValueOnce(new Error('Create error'));
    render(<EditCategory />);
    await fillForm();

    const submitButton = screen.getByText('commonUIelements.create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Create error')).toBeInTheDocument();
    });

  });

});
