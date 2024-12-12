import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import React from 'react';
import ArticleHomePage from '../../pages/Articles/articleManagementPage';
import { MemoryRouter } from 'react-router-dom';
import { articlesMockDataFilled } from '../.mocks/mockConstants';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('../../.components/.common-components/ErrorPopup', () => ({ showErrorModal, errorMessage, onClose }) => (
    showErrorModal ? <div>{errorMessage}</div> : null
));

afterEach(() => {
    jest.clearAllMocks();
});

describe('articleManagementPage.js tests', () => {
    const setup = () => {
        render(
            <MemoryRouter>
                <ArticleHomePage />
            </MemoryRouter>
        );
    };

    /**
     * Check if there is create article, paragraph and question buttons
     * 
     */
    test('should render articleManagementPage', async () => {
        setup();
        await waitFor(() => {
            expect(screen.getByText('articleManagment.createArticle')).toBeInTheDocument();
            expect(screen.getByText('articleManagment.createParagraph')).toBeInTheDocument();
            expect(screen.getByText('articleManagment.createQuestion')).toBeInTheDocument();
        });
    });

    /**
     * Check if there is atleast two articles
     */
    /*
    test('should contain atleast two articles', async () => {
        setup();
        await waitFor(() => {
            expect(screen.getByText(articlesMockDataFilled.articles[0].title)).toBeInTheDocument();
            expect(screen.getByText(articlesMockDataFilled.articles[1].title)).toBeInTheDocument();
        });
    });
*/

});

