/* eslint-disable @typescript-eslint/no-empty-function */
// /**
//  * @jest-environment jsdom
//  */
/* eslint-disable-next-line */
/* eslint-disable testing-library/no-render-in-setup */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalContent from '../components/Modal/ModalContent';
import Provider from '../components/Provider';

// eslint-disable-next-line no-undef

describe('Form create Modal', () => {
  let createButton;

  beforeEach(() => {
    render(
      <>
        <Provider>
          <ModalContent exitHandler={() => {}} type={'create'} />
        </Provider>
      </>
    );

    //Elements
    createButton = screen.getByText('Add Note');
  });

  it('is noStatus when no condition', () => {
    expect(screen.getByText('No Status'));
  });

  it('alerts on title fields are not filled', () => {
    fireEvent.click(createButton);
    expect(screen.getByText('Title cannot be empty'));
  });
});
