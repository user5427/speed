// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  __esModule: true,
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
  Trans: ({ children }) => children,
}));


test('renders the Navbar', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const logoElement = screen.getByAltText('logo');
  const siteNameElement = screen.getByText('Speedreader.com');
  const homeLink = screen.getByText('homepage.home');
  const aboutLink = screen.getByText('homepage.about');
  const profileLink = screen.getByText(/Jonas Jonaitis/i);
  const profileIcon = screen.getByTestId('profile-icon');
  const languageSelector = screen.getByTestId('language-selector');
  expect(logoElement).toBeInTheDocument();
  expect(siteNameElement).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(profileLink).toBeInTheDocument();
  expect(profileIcon).toBeInTheDocument();
  expect(languageSelector).toBeInTheDocument();
});


jest.mock('./pages/HomePage/homePage', () => () => <div>homepage.flashingSentence</div>);

test('renders Landing component on default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const landingElement = screen.getByText('homepage.flashingSentence');
  expect(landingElement).toBeInTheDocument();
});

