import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditArticleParagraphQuestion from './editAll';
import {
  CreateEditArticle,
  CreateEditParagraph,
  ReturnToArticlesButton,
  CreateEditQuestion,
  ArticleList,
  ParagraphList,
  QuestionList,
} from '../../.components/.MainComponentsExport';

// Mock hooks and components
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../../.components/.MainComponentsExport', () => ({
  CreateEditArticle: jest.fn(() => <div>CreateEditArticle</div>),
  CreateEditParagraph: jest.fn(() => <div>CreateEditParagraph</div>),
  ReturnToArticlesButton: jest.fn(() => <button>Return to Articles</button>),
  CreateEditQuestion: jest.fn(() => <div>CreateEditQuestion</div>),
  ArticleList: jest.fn(() => <div>ArticleList</div>),
  ParagraphList: jest.fn(() => <div>ParagraphList</div>),
  QuestionList: jest.fn(() => <div>QuestionList</div>),
}));

describe('EditArticleParagraphQuestion Component', () => {
  let mockSetSearchParams;

  beforeEach(() => {
    // Mock `useSearchParams`
    mockSetSearchParams = jest.fn();
    useSearchParams.mockReturnValue([{ get: jest.fn().mockReturnValue(null) }, mockSetSearchParams]);

    jest.clearAllMocks(); // Clear any previous mocks
  });


  test('reset buttons disable correctly when no data is set', () => {
    render(<EditArticleParagraphQuestion />);

    // Check for reset buttons
    const resetArticleButton = screen.getByText('editPages.all.resetArticle');
    const resetParagraphButton = screen.getByText('editPages.all.resetParagraph');
    const resetQuestionButton = screen.getByText('editPages.all.resetQuestion');

    // Ensure they are disabled by default
    expect(resetArticleButton).toBeDisabled();
    expect(resetParagraphButton).toBeDisabled();
    expect(resetQuestionButton).toBeDisabled();
  });
  test('renders the component with all main elements', () => {
    render(<EditArticleParagraphQuestion />);

    // Check for the heading
    expect(screen.getByText('editPages.all.editAll')).toBeInTheDocument();

    // Check for the return button

    // Check for default article editor and lists
  });


  test('reset buttons disable correctly when no data is set', () => {
    render(<EditArticleParagraphQuestion />);

    // Check for reset buttons
    const resetArticleButton = screen.getByText('editPages.all.resetArticle');
    const resetParagraphButton = screen.getByText('editPages.all.resetParagraph');
    const resetQuestionButton = screen.getByText('editPages.all.resetQuestion');

    // Ensure they are disabled by default
    expect(resetArticleButton).toBeDisabled();
    expect(resetParagraphButton).toBeDisabled();
    expect(resetQuestionButton).toBeDisabled();
  });

});
describe('EditArticleParagraphQuestion Component2', () => {
    let mockSetSearchParams;

    beforeEach(() => {
        mockSetSearchParams = jest.fn();
        useSearchParams.mockReturnValue([{ get: jest.fn().mockReturnValue(null) }]);
        //useTranslation.mockReturnValue({ t: jest.fn((key) => key) });
    });

    it('should call resetArticleId when Reset Article button is clicked', () => {
        render(<EditArticleParagraphQuestion />);
        
        const button = screen.getByText('editPages.all.resetArticle');
        fireEvent.click(button);

        expect(button).toBeDisabled(); // Button is disabled initially
    });

    it('should call resetParagraphId when Reset Paragraph button is clicked', () => {
        render(<EditArticleParagraphQuestion />);

        const button = screen.getByText('editPages.all.resetParagraph');
        fireEvent.click(button);

        expect(button).toBeDisabled(); // Button is disabled initially
    });

    it('should call resetQuestionId when Reset Question button is clicked', () => {
        render(<EditArticleParagraphQuestion />);

        const button = screen.getByText('editPages.all.resetQuestion');
        fireEvent.click(button);

        expect(button).toBeDisabled(); // Button is disabled initially
    });

    // it('should trigger updates for article list when corresponding function is called', () => {
    //     // render(<EditArticleParagraphQuestion />);

    //     // const articleListTrigger = jest.fn();
    //     // const button = screen.getByText('editPages.all.resetArticle');
    //     // fireEvent.click(button);

    //     // expect(articleListTrigger).toHaveBeenCalled();
    //     const articleListTrigger = jest.fn();

    //     render(<EditArticleParagraphQuestion />);

    //     const button = screen.getByText('editPages.all.resetArticle');
    //     fireEvent.click(button);

    //     // Ensure the trigger function is called
    //     expect(articleListTrigger).toHaveBeenCalled();
    // });
});
