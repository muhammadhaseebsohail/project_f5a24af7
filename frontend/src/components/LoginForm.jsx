Here is a simple implementation of a login form component in React with input validation and error handling.

1. The complete component code with all imports:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

/**
 * Login Form Component
 * @param {object} props - Component props
 * @param {function} props.onSubmit - Function to call on form submission
*/
function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateForm = () => {
    let errors = {};
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (!errors.username && !errors.password) {
      onSubmit({ username, password });
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

2. Any necessary CSS/styling

```css
/* LoginForm.css */
.login-form {
  display: flex;
  flex-direction: column;
}

.login-form input {
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
}

.login-form button {
  padding: 10px;
  font-size: 1em;
  margin-top: 20px;
}

.error {
  color: red;
  margin: 5px 0;
}
```

3. PropTypes

```jsx
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
```

4. Export statement

```jsx
export default LoginForm;
```

In this component, the form will not be submitted if any of the fields are empty. The error messages will be displayed below the input fields. This form also includes a very basic validation check. For more complex validation, you may want to use a library like Yup or Formik.