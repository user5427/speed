import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleSearch from '../article-search';
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import { useTranslation } from 'react-i18next';

jest.mock('../../../.controllers/.MainControllersExport', () => ({
  ArticleController: {
    Search: jest.fn(),
  },
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('../../.common-components/ErrorPopup', () => ({ showErrorModal, errorMessage, onClose }) => (
  showErrorModal ? <div>{errorMessage}</div> : null
));

afterEach(() => {
  jest.clearAllMocks();
});

test('renders ArticleSearch component', () => {
  const { getByLabelText } = render(<ArticleSearch />);
  expect(getByLabelText('articles.search.searchArticles')).toBeInTheDocument();
});

test('updates options based on user input', async () => {
  const mockArticles = {
    articles: [
      { id: 1, title: 'Article One' },
      { id: 2, title: 'Article Two' },
    ],
  };

  ArticleController.Search.mockResolvedValue(mockArticles);

  const { getByPlaceholderText } = render(<ArticleSearch />);
  const input = getByPlaceholderText('articles.search.enterArticleTitle');

  fireEvent.change(input, { target: { value: 'Article' } });

  await waitFor(() => {
    expect(ArticleController.Search).toHaveBeenCalledWith('Article');
    const datalist = document.getElementById('articles');
    expect(datalist).toBeInTheDocument();
    expect(datalist.children.length).toBe(2);
    expect(datalist.children[0]).toHaveAttribute('value', 'Article One');
    expect(datalist.children[1]).toHaveAttribute('value', 'Article Two');
  });
});

test('displays error modal when search fails', async () => {
  const mockError = new Error('Network Error');

  ArticleController.Search.mockRejectedValue(mockError);

  const { getByPlaceholderText, findByText } = render(<ArticleSearch />);
  const input = getByPlaceholderText('articles.search.enterArticleTitle');

  fireEvent.change(input, { target: { value: 'Article' } });

  const errorMessage = await findByText('Network Error');
  expect(errorMessage).toBeInTheDocument();
});
