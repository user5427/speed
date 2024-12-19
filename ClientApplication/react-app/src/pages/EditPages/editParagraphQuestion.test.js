import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18next from 'i18next'; // Import i18next
import EditParagraphQuestion from './editParagraphQuestionPage'; 

// Initialize i18next mock
i18next.init({
  lng: 'en',  // You can choose the language you'd like to use
  resources: {
    en: {
      translation: {
        // Mock your translations here
        'editPages.paragraphs.editParAndQ': 'Edit Paragraph and Question',
        'editPages.paragraphs.qEditingorCreating': 'Edit or Create Question',
        'editPages.paragraphs.resetQuest': 'Reset Question',
        'editPages.paragraphs.questUnavailable': 'Questions unavailable',
      },
    },
  },
});

jest.mock('../../.components/.MainComponentsExport', () => ({
  CreateEditParagraph: jest.fn(() => <div>Create/Edit Paragraph</div>),
  CreateEditQuestion: jest.fn(() => <div>Create/Edit Question</div>),
  QuestionList: jest.fn(() => <div>Question List</div>),
  ReturnToArticlesButton: jest.fn(() => <div>Return to Articles</div>),
}));

describe('EditParagraphQuestion Component', () => {
  // test('renders correctly when paragraphId is set', () => {
  //   render(
  //     <I18nextProvider i18n={i18next}>
  //       <MemoryRouter>
  //         <EditParagraphQuestion />
  //       </MemoryRouter>
  //     </I18nextProvider>
  //   );

  //   expect(screen.getByText('Create/Edit Paragraph')).toBeInTheDocument();
  //   expect(screen.getByText('Create/Edit Question')).toBeInTheDocument();
  //   expect(screen.getByText('Question List')).toBeInTheDocument();
  //   expect(screen.getByText('Return to Articles')).toBeInTheDocument();
  // });

  // test('handles resetting question', () => {
  //   render(
  //     <I18nextProvider i18n={i18next}>
  //       <MemoryRouter>
  //         <EditParagraphQuestion />
  //       </MemoryRouter>
  //     </I18nextProvider>
  //   );

  //   // Add your test interaction and validation logic here.
  //   expect(screen.getByText('Create/Edit Question')).toBeInTheDocument();
  // });

  // test('renders question list when paragraphId is present', async () => {
  //   render(<EditParagraphQuestion />);

  //   // Check if the paragraph ID is set and question list is rendered
  //   expect(screen.getByText('Create/Edit Paragraph')).toBeInTheDocument();
  //   expect(screen.getByText('Question List')).toBeInTheDocument();
  // });

  // test('sets paragraphId from search params on load', async () => {
  //   render(
  //     <MemoryRouter initialEntries={['/edit-paragraph-question?paragraphId=123']}>
  //       <EditParagraphQuestion />
  //     </MemoryRouter>
  //   );

  //   // Check if paragraphId was set correctly
  //   await waitFor(() => {
  //     expect(screen.getByText('Create/Edit Paragraph')).toBeInTheDocument();
  //   });
  // });

  // test('calls handleResetParagraph when reset paragraph button is clicked', () => {
  //   render(
  //     <MemoryRouter>
  //       <EditParagraphQuestion />
  //     </MemoryRouter>
  //   );

  //   // Check the reset button and fire the click event
  //   const resetButton = screen.getByText('editPages.paragraphs.resetQuest');
  //   fireEvent.click(resetButton);

  //   // Verify the paragraphId and questionId are reset
  //   expect(screen.getByText('Create/Edit Paragraph')).toBeInTheDocument();
  //   expect(screen.getByText('Create/Edit Question')).toBeInTheDocument();
  // });

  // test('calls handleResetQuestion when reset question button is clicked', () => {
  //   render(
  //     <MemoryRouter>
  //       <EditParagraphQuestion />
  //     </MemoryRouter>
  //   );

  //   // Simulate having a questionId
  //   fireEvent.click(screen.getByText('Create/Edit Question'));

  //   // Check the reset question button and fire the click event
  //   const resetButton = screen.getByText('editPages.paragraphs.resetQuest');
  //   fireEvent.click(resetButton);

  //   // Verify questionId is reset
  //   expect(screen.getByText('Create/Edit Question')).toBeInTheDocument();
  // });

  test('disables reset question button when no questionId is set', () => {
    render(
      <MemoryRouter>
        <EditParagraphQuestion />
      </MemoryRouter>
    );

    // Check if the reset question button is disabled
    expect(screen.getByText('editPages.paragraphs.resetQuest')).toBeDisabled();
  });

  // test('updates question list when paragraphId or questionId changes', async () => {
  //   render(
  //     <MemoryRouter>
  //       <EditParagraphQuestion />
  //     </MemoryRouter>
  //   );

  //   const paragraphId = '123';
  //   fireEvent.click(screen.getByText('Create/Edit Paragraph'));
    
  //   // Simulate receiving a new paragraphId
  //   fireEvent.click(screen.getByText('Create/Edit Paragraph'));
  //   expect(screen.getByText('Question List')).toBeInTheDocument();
  // });

  test('renders appropriate message when no paragraphId is provided', async () => {
    render(
      <MemoryRouter>
        <EditParagraphQuestion />
      </MemoryRouter>
    );

    // Check if the "questUnavailable" message is shown when no paragraphId is available
    expect(screen.getByText('editPages.paragraphs.questUnavailable')).toBeInTheDocument();
  });
});