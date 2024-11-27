import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import React from 'react';
import CreateArticle from '../../pages/CreatePages/createArticlePage';
import { MemoryRouter } from 'react-router-dom';



describe('createArticlePage.js tests', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <CreateArticle />
      </MemoryRouter>
    );
  };

});







