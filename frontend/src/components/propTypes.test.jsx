Here's how you might test the HomePage component using Jest and React Testing Library:

```jsx
// Import necessary testing utilities
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './HomePage';

// Test suite for HomePage
describe('HomePage', () => {
  // Test if HomePage renders correctly with given props
  it('renders correctly', async () => {
    render(<HomePage title="Game Builder" description="Build your dream game!" />);

    // Wait for loading state to finish
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Expect the title and description to be in the document
    expect(screen.getByText('Game Builder')).toBeInTheDocument();
    expect(screen.getByText('Build your dream game!')).toBeInTheDocument();
  });

  // Test the loading state
  it('displays loading state', () => {
    render(<HomePage title="Game Builder" description="Build your dream game!" />);

    // Expect the loading text to be in the document
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test the propTypes
  it('requires title and description props', () => {
    console.error = jest.fn();

    // Render without passing the required props
    render(<HomePage />);

    // Expect console.error to have been called
    expect(console.error).toHaveBeenCalled();
  });

  // Test with no description
  it('renders correctly with no description', async () => {
    render(<HomePage title="Game Builder" />);

    // Wait for loading state to finish
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Expect the title to be in the document and description to not exist
    expect(screen.getByText('Game Builder')).toBeInTheDocument();
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});
```
In the above tests:

- The first test checks if the component renders correctly with the given props.
- The second test checks if the loading state is displayed correctly.
- The third test checks if console.error is called when required props are not passed to the component (React logs a warning in the console when required props are not provided).
- The last test checks if the component renders correctly when only the title prop is provided and no description is given.