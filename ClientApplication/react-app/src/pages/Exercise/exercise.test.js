import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Exercise from './exercise';
import * as ArticleController from '../../.controllers/.MainControllersExport';
import * as ParagraphController from '../../.controllers/.MainControllersExport';
import * as QuestionController from '../../.controllers/.MainControllersExport';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: () => [new URLSearchParams({ articleId: '1' })],
}));

jest.mock('../../.controllers/.MainControllersExport');

describe('Exercise Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(
      <MemoryRouter>
        <Exercise />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument();
  });

  // test('fetches article and paragraphs on mount', async () => {
  //   const mockArticle = { title: 'Test Article', categoryTitle: 'Test Subject', paragraphIDs: [1, 2] };
  //   const mockParagraphs = [
  //     { id: 1, text: 'Paragraph 1', questionIDs: [1] },
  //     { id: 2, text: 'Paragraph 2', questionIDs: [] },
  //   ];

  //   ArticleController.Get.mockResolvedValue(mockArticle);
  //   ParagraphController.Get.mockImplementation((id) => Promise.resolve(mockParagraphs.find(p => p.id === id)));

  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <Exercise />
  //       </MemoryRouter>
  //     );
  //   });

  //   expect(screen.getByText('Test Article')).toBeInTheDocument();
  //   expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
  // });

  // test('starts reading exercise and updates word index', async () => {
  //   const mockArticle = { title: 'Test Article', categoryTitle: 'Test Subject', paragraphIDs: [1] };
  //   const mockParagraph = { id: 1, text: 'This is a test paragraph.', questionIDs: [] };

  //   ArticleController.Get.mockResolvedValue(mockArticle);
  //   ParagraphController.Get.mockResolvedValue(mockParagraph);

  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <Exercise />
  //       </MemoryRouter>
  //     );
  //   });

  //   const startButton = screen.getByText('Start');
  //   fireEvent.click(startButton);

  //   await act(async () => {
  //     jest.advanceTimersByTime(1000); // Simulate word reveal interval
  //   });

  //   expect(screen.getByText('This')).toBeInTheDocument();
  // });

  // test('handles question submission with correct and incorrect answers', async () => {
  //   const mockArticle = { title: 'Test Article', categoryTitle: 'Test Subject', paragraphIDs: [1] };
  //   const mockParagraph = { id: 1, text: 'Paragraph 1', questionIDs: [1] };
  //   const mockQuestion = { id: 1, text: 'Test Question', correctAnswerIndex: 1, answerChoices: ['Option 1', 'Option 2'] };

  //   ArticleController.Get.mockResolvedValue(mockArticle);
  //   ParagraphController.Get.mockResolvedValue(mockParagraph);
  //   QuestionController.Get.mockResolvedValue(mockQuestion);

  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <Exercise />
  //       </MemoryRouter>
  //     );
  //   });

  //   fireEvent.click(screen.getByText('Show Question'));

  //   const option1 = screen.getByText('Option 1');
  //   fireEvent.click(option1);

  //   expect(screen.getByText('Incorrect')).toBeInTheDocument();

  //   const option2 = screen.getByText('Option 2');
  //   fireEvent.click(option2);

  //   expect(screen.getByText('Correct')).toBeInTheDocument();
  // });

  // test('renders results when exercise is completed', async () => {
  //   const mockArticle = { title: 'Test Article', categoryTitle: 'Test Subject', paragraphIDs: [1] };
  //   const mockParagraph = { id: 1, text: 'Paragraph 1', questionIDs: [] };

  //   ArticleController.Get.mockResolvedValue(mockArticle);
  //   ParagraphController.Get.mockResolvedValue(mockParagraph);

  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <Exercise />
  //       </MemoryRouter>
  //     );
  //   });

  //   fireEvent.click(screen.getByText('Start'));
  //   fireEvent.click(screen.getByText('Next'));

  //   expect(screen.getByText('Results')).toBeInTheDocument();
  // });
});