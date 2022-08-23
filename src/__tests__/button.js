/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-empty-function */
// /**
//  * @jest-environment jsdom
//  */
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
  it('renders without an error', () => {
    render(
      <Button isDisable={false} onClick={() => {}}>
        {'Button Text'}
      </Button>
    );
    expect(screen.getByText('Button Text'));
  });

  it('calls the onClick function provided as a prop', () => {
    const onClickPropFunction = jest.fn();
    render(
      <Button onClick={onClickPropFunction} isDisable={false}>
        {'Button Text'}
      </Button>
    );
    fireEvent.click(screen.getByText('Button Text'));
    expect(onClickPropFunction).toHaveBeenCalled();
  });
  it('prevents clicking when disabled', () => {
    const onClickPropFunction = jest.fn();
    render(
      <Button onClick={onClickPropFunction} isDisable={true}>
        {'Button Text'}
      </Button>
    );
    fireEvent.click(screen.getByText('Button Text'));
    expect(onClickPropFunction).not.toHaveBeenCalled();
  });
});
