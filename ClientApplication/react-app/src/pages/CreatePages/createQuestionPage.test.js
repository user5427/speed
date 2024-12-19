import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateQuestion from './createQuestionPage'; // Adjust the import path to your component
import { useNavigate } from 'react-router-dom'; // Import the necessary hook

// Mock react-i18next and react-router-dom
// jest.mock('react-i18next', () => ({
//   useTranslation: jest.fn(() => ({
//     t: (key) => key, // Return the key itself as translation for simplicity
//   })),
// }));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// jest.mock('../../.components/.MainComponentsExport', () => ({
//   CreateEditArticle: jest.fn(() => <div>Article Editor</div>),
//   ReturnToArticlesButton: jest.fn(() => <button>Return to Articles</button>),
// }));

describe('CreateArticle Component', () => {
  let navigateMock;

  beforeEach(() => {
     navigateMock = useNavigate(); // Capture the mock of useNavigate
    
  });

  test('renders the "createArticle" heading and components', () => {
    render(<CreateQuestion />);

    // Check if the heading is rendered
    expect(screen.getByText('articles.returnToArticlesBtn.main')).toBeInTheDocument();

    
  });

});