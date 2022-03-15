import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonStyle from '../../../components/Button';

describe('Test button successfully', () => {
  it('Should render the button successfully', () => {
    const ButtonText = 'Fazer login';
    const { container } = render(
      <ButtonStyle variant="contained" color="primary">
        {ButtonText}
      </ButtonStyle>,
    );

    const button = screen.getByRole('button', { name: ButtonText });

    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('Must call the button onClick function successfully', () => {
    const ButtonText = 'Fazer login';
    const onClick = jest.fn();
    render(
      <ButtonStyle variant="contained" color="primary" onClick={onClick}>
        {ButtonText}
      </ButtonStyle>,
    );

    const button = screen.getByRole('button', { name: ButtonText });

    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
