import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleHomePage from './articleManagementPage';  // Adjust the import path to your component
import { useNavigate } from 'react-router-dom';

// Mock necessary hooks
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key) => key,  // Return key as a placeholder for translation
    }),
  }));
  
  // Mock the `useNavigate` hook from react-router-dom
  jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),  // Mock useNavigate hook
  }));

describe('ArticleHomePage Component', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = useNavigate(); // Capture the mock navigate function
  });

  test('renders the ArticleHomePage when loggedInUser is provided', () => {
    const loggedInUser = { username: 'testuser' }; // Example logged-in user
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    // Check if the page title is rendered
    expect(screen.getByText('articleManagment.articleHomePage')).toBeInTheDocument();

    // Check if the "createArticle" button is rendered
    expect(screen.getByText('articleManagment.createArticle')).toBeInTheDocument();
    
    // Check if the "createParagraph" button is rendered
    expect(screen.getByText('articleManagment.createParagraph')).toBeInTheDocument();

    // Check if the "createQuestion" button is rendered
    expect(screen.getByText('articleManagment.createQuestion')).toBeInTheDocument();
  });

  test('renders the ArticleHomePage when loggedInUser is null', () => {
    render(<ArticleHomePage loggedInUser={null} />);

    // Check if only the article list heading is rendered
    expect(screen.getByText('articleManagment.articleList')).toBeInTheDocument();
    
    // Ensure no "create" buttons are present when loggedInUser is null
    expect(screen.queryByText('articleManagment.createArticle')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createParagraph')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createQuestion')).not.toBeInTheDocument();
  });

  test('settings are updated based on loggedInUser', () => {
    const loggedInUser = { username: 'testuser' }; // Simulate a logged-in user
    const { rerender } = render(<ArticleHomePage loggedInUser={loggedInUser} />);

    // Check if settings are correctly set for logged-in user
    expect(screen.getByText('articleManagment.createArticle')).toBeInTheDocument();
    expect(screen.getByText('articleManagment.createParagraph')).toBeInTheDocument();
    expect(screen.getByText('articleManagment.createQuestion')).toBeInTheDocument();

    // Now simulate a logged-out user
    rerender(<ArticleHomePage loggedInUser={null} />);

    // Ensure the settings are correctly updated for logged-out user
    expect(screen.queryByText('articleManagment.createArticle')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createParagraph')).not.toBeInTheDocument();
    expect(screen.queryByText('articleManagment.createQuestion')).not.toBeInTheDocument();
  });
});

describe('ArticleHomePage component', () => {
    let navigateMock;

    beforeEach(() => {
      navigateMock = jest.fn(); // Create the mock function
      useNavigate.mockReturnValue(navigateMock); // Return the mock function for useNavigate
    });

  test('should navigate to /create-article when the "create article" button is clicked', () => {
    const loggedInUser = { username: 'testuser' }; // Simulate a logged-in user
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    // Simulate clicking the "create article" button
    const createArticleButton = screen.getByText('articleManagment.createArticle');
    fireEvent.click(createArticleButton);

    // Check if navigate was called with the correct URL
    expect(navigateMock).toHaveBeenCalledWith('/create-article');
  });

  test('should navigate to /create-paragraph when the "create paragraph" button is clicked', () => {
    const loggedInUser = { username: 'testuser' };
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    // Simulate clicking the "create paragraph" button
    const createParagraphButton = screen.getByText('articleManagment.createParagraph');
    fireEvent.click(createParagraphButton);

    // Check if navigate was called with the correct URL
    expect(navigateMock).toHaveBeenCalledWith('/create-paragraph');
  });

  test('should navigate to /create-question when the "create question" button is clicked', () => {
    const loggedInUser = { username: 'testuser' };
    render(<ArticleHomePage loggedInUser={loggedInUser} />);

    // Simulate clicking the "create question" button
    const createQuestionButton = screen.getByText('articleManagment.createQuestion');
    fireEvent.click(createQuestionButton);

    // Check if navigate was called with the correct URL
    expect(navigateMock).toHaveBeenCalledWith('/create-question');
  });
  });