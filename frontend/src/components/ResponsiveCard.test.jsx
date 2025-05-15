To test this `ResponsiveCard` component, you can use the following code:

```jsx
// Necessary imports
import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResponsiveCard from './ResponsiveCard';

// Clean up after each test
afterEach(cleanup);

// Test 1: Component rendering
test('renders without crashing', () => {
  render(<ResponsiveCard title="Test Title" description="Test Description" />);
});

// Test 2: User interactions
test('displays correct title and description', () => {
  render(<ResponsiveCard title="Test Title" description="Test Description" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});

// Test 3: Props validation
test('throws error when missing props', () => {
  console.error = jest.fn(); // Suppress console error for missing prop

  expect(() => {
    render(<ResponsiveCard />);
  }).toThrowError();

  expect(console.error).toHaveBeenCalled();
});

// Test 4: Edge cases
test('handles long title and description correctly', () => {
  const longString = new Array(1000).fill('a').join('');

  render(<ResponsiveCard title={longString} description={longString} />);
  expect(screen.getByText(longString)).toBeInTheDocument();
});
```

These tests will cover the majority of cases for this component, including rendering, user interactions, props validation, and edge cases.

In the `renders without crashing` test, we're simply checking that the component can render without throwing an error.

In the `displays correct title and description` test, we're checking that the component correctly displays the title and description passed in as props.

In the `throws error when missing props` test, we're checking that the component throws an error when required props are missing. By default, React logs a warning to the console when required props are missing. We suppress this with `console.error = jest.fn();` to keep the test output clean.

Finally, in the `handles long title and description correctly` test, we're testing an edge case where the title and description are extremely long. We want to ensure that the component can handle this without crashing or displaying unexpected output.