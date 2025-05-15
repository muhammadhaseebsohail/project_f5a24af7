Here is how you could write tests for the LoginForm component using Jest and React Testing Library:

```jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const setup = () => {
    const utils = render(<LoginForm onSubmit={jest.fn()} />);
    const usernameInput = utils.getByPlaceholderText('Username');
    const passwordInput = utils.getByPlaceholderText('Password');
    const loginButton = utils.getByText('Login');
    return {
      usernameInput,
      passwordInput,
      loginButton,
      ...utils,
    }
  }
  
  test('renders the component', () => {
    const { getByText } = render(<LoginForm onSubmit={jest.fn()} />);
    const loginButton = getByText('Login');
    expect(loginButton).toBeTruthy();
  });

  test('shows an error when a field is left empty', async () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Password is required')).toBeInTheDocument();
    });
    
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Username is required')).toBeInTheDocument();
    });
  });

  test('calls onSubmit prop when form is submitted', () => {
    const onSubmit = jest.fn();
    const { usernameInput, passwordInput, loginButton } = setup();

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.click(loginButton);

    expect(onSubmit).toHaveBeenCalledWith({ username: 'test', password: 'test' });
  });
});
```

This first setup function helps to reduce code repetition by rendering the component and returning the inputs and button.

The first test checks if the component renders correctly by checking the existence of the Login button.

The second test checks if the component shows an error message when a field is left empty. It simulates user input on the username field and then clicks the login button to check if the password error is shown. Then it does the same for the username field.

The final test checks if the onSubmit prop is called with the correct parameters when the form is submitted with valid input.

Note: All these tests are asynchronous because state updates in React are not synchronous, and we have to wait for the changes to be reflected in the DOM. The waitFor function from React Testing Library is useful here.