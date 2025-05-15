Sure, here are the unit tests for the SignupForm component:

```jsx
// Necessary imports
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
  // Test for component rendering
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<SignupForm onSubmit={()=>{}} />);
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  // Test for user interactions
  it('handles user input and form submission', async () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByValue, queryByText } = 
        render(<SignupForm onSubmit={mockSubmit} />);
    
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByValue('Sign Up');

    // simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { 
        target: { value: 'testpassword' } 
    });

    // simulate form submission
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
      expect(mockSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
        confirmPassword: 'testpassword',
      });
    });

    // no error messages should be rendered
    expect(queryByText('Username is required')).not.toBeInTheDocument();
    expect(queryByText('Password is required')).not.toBeInTheDocument();
    expect(queryByText('Passwords do not match')).not.toBeInTheDocument();
  });

  // Test for edge cases and props validation
  it('validates form and shows error messages', async () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByValue, getByText } =
        render(<SignupForm onSubmit={mockSubmit} />);
    
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signupButton = getByValue('Sign Up');

    // simulate user typing
    fireEvent.change(usernameInput, { target: { value: '' } }); // empty username
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { 
        target: { value: 'anotherpassword' } 
    }); // passwords do not match

    // simulate form submission
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    // error messages should be rendered
    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });
});
```

In these tests, we're using the `render` function from React Testing Library to render the component, the `fireEvent` function to simulate user interactions, and the `waitFor` function to wait for the form submission to complete.

The first test checks if the component renders without crashing. The second test handles user input and form submission. It simulates a user typing into the input fields and submitting the form, and checks if the `onSubmit` prop function is called with the correct parameters.

The third test validates the form and shows error messages. It simulates a user entering invalid data and submitting the form, and checks if the error messages are displayed correctly.