In this task, you're asked to implement automated testing for the frontend, which is more about configuring a testing setup and writing test cases than creating a React component. However, I will provide a simple example of a React component along with its associated test file using Jest and React Testing Library to demonstrate how you might approach frontend testing.

Component: `Greeting.js`

```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple greeting component that displays a greeting message to the user.
 */
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
```

Test: `Greeting.test.js`

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Greeting from './Greeting';

describe('Greeting', () => {
  test('renders Greeting component', () => {
    render(<Greeting name="John" />);
    expect(screen.getByText('Hello, John!')).toBeInTheDocument();
  });

  test('throws error when no name prop is provided', () => {
    console.error = jest.fn(); // Mute console.error for this test

    const renderComponent = () => {
      render(<Greeting />);
    };

    expect(renderComponent).toThrowError();
    expect(console.error).toHaveBeenCalled(); // A prop type error should be logged
  });
});
```

The first test case is a unit test that checks if the Greeting component renders correctly with a given prop. The second test case is an integration test that checks if the Greeting component behaves correctly when not supplied the necessary props (it should throw an error).

Note: Depending on the complexity of your app, you might need to wrap your component within a provider (like Redux or Context) when testing. This is just a basic example.