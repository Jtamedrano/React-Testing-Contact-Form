import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('Renders Contact Form', () => {
  render(<ContactForm />);
});

test('type inputs into form and submit', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name\S/i, {
    selector: 'input',
  });
  const lastNameInput = screen.getByLabelText(/last name\S/i, {
    selector: 'input',
  });
  const emailInput = screen.getByLabelText(/email/i, { selector: 'input' });
  const messageInput = screen.getByLabelText(/message/i, {
    selector: 'textarea',
  });

  await userEvent.type(firstNameInput, 'first');
  await userEvent.type(lastNameInput, 'last');
  await userEvent.type(emailInput, 'email@test.com');
  await userEvent.type(messageInput, 'test123');

  await expect(firstNameInput).toHaveValue('first');
  await expect(lastNameInput).toHaveValue('last');
  await expect(emailInput).toHaveValue('email@test.com');
  await expect(messageInput).toHaveValue('test123');

  const button = screen.getByText('', { selector: '#submit' });

  await userEvent.click(button);

  const result = screen.findByText(/"firstName": "first"/i);

  result.then((item) => {
    expect(item).toBeTruthy();
  });
});
