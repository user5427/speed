import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { I18nextProvider } from 'react-i18next';
import testI18n from '../../../test-i18n'; 
import LanguageSelector from '../LanguageSelector'; 
import { act } from 'react';

jest.mock('country-flag-icons/react/3x2', () => ({
  GB: () => <span data-testid="flag-gb">🇬🇧</span>,
  LT: () => <span data-testid="flag-lt">🇱🇹</span>,
  DE: () => <span data-testid="flag-de">🇩🇪</span>,
}));

describe('LanguageSelector Component', () => {
  test('Language changing within LanguageSelector component', async () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    // Test initial language is English
    const initialButton = screen.getByRole('button', { name: /Select language\. Current language is English/i });
    expect(initialButton).toBeInTheDocument();
    expect(initialButton).toHaveTextContent('🇬🇧English');

    // Open the dropdown
    await act(async () => {
      await userEvent.click(initialButton);
    });

    // Change to LT
    const lithuanianOption = screen.getByRole('button', { name: /Change language to Lithuanian/i });
    expect(lithuanianOption).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(lithuanianOption);
    });

    // Test the selected language is updated in the button
    await waitFor(() => {
      const updatedButton = screen.getByRole('button', { name: /Select language\. Current language is Lietuvių/i });
      expect(updatedButton).toBeInTheDocument();
      expect(updatedButton).toHaveTextContent('🇱🇹Lietuvių');
    });
    expect(testI18n.language).toBe('lt');

    // Change to DE
    const germanOption = screen.getByRole('button', { name: /Change language to Vokiečių/i });
    expect(germanOption).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(germanOption);
    });

    // Test the selected language is updated in the button
    await waitFor(() => {
      const updatedButton = screen.getByRole('button', { name: /Select language\. Current language is Deutsch/i });
      expect(updatedButton).toBeInTheDocument();
      expect(updatedButton).toHaveTextContent('🇩🇪Deutsch');
    });

    expect(testI18n.language).toBe('de');
  });
});
