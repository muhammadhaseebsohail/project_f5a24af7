Here is a simple example of a React signup form with input validation and error handling:

```jsx
// Necessary imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components for styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const ErrorMessage = styled.span`
  color: red;
`;

// Component
const SignupForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!formState.username) {
      formErrors.username = 'Username is required';
    }

    if (!formState.password) {
      formErrors.password = 'Password is required';
    } else if (formState.password !== formState.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit(formState);
    }
  };

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        value={formState.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
      <Input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      <Input
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
      )}
      <Input type="submit" value="Sign Up" />
    </Form>
  );
};

// PropTypes
SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
```

In this component, we're using the `useState` hook to manage the form state and the errors. The `handleChange` function will update the form state as the user types in the input fields. The `handleSubmit` function will validate the form when the user submits it, and if the form is valid, it will call the `onSubmit` prop function with the form state as a parameter. The form validation errors are displayed next to the corresponding input fields.