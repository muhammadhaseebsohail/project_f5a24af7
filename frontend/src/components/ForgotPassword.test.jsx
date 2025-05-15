Sure, here is a comprehensive unit test:

```jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword', () => {

  // Test for component rendering
  test('renders correctly', () => {
    const { getByLabelText, getByRole, getByText } = render(<ForgotPassword onSubmit={() => {}} />);
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText('Forgot Password')).toBeInTheDocument();
  });

  // Test for user interactions
  test('updates email field', () => {
    const { getByLabelText } = render(<ForgotPassword onSubmit={() => {}} />);
    const input = getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  // Test for props validation (onSubmit function)
  test('calls onSubmit prop when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByRole } = render(<ForgotPassword onSubmit={handleSubmit} />);
    const submitButton = getByRole('button');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });

  // Test for edge cases (loading state and error handling)
  test('displays loading state and handles error', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('An error occurred'));
    const { getByRole, findByText } = render(<ForgotPassword onSubmit={handleSubmit} />);
    const submitButton = getByRole('button');
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Loading...');
    const errorMessage = await findByText('An error occurred');
    expect(errorMessage).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('Submit');
  });
});
```

In this test suite:

- We're using Jest as the test runner.
- We're using React Testing Library to render the component, simulate user interactions, and make assertions.
- The `render` function renders the component and returns an object with queries to get elements from the rendered component.
- The `fireEvent` function simulates user interactions.
- The `waitFor` and `findByText` functions are used to test asynchronous behavior.
- Mock functions are used to simulate the `onSubmit` prop.
- We're testing that the component renders correctly, the email field updates correctly, the `onSubmit` prop is called when the form is submitted, and the loading state and error handling work correctly.