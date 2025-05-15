Sure, here is the React component for 'Forgot Password' form.

1. Complete component code with all imports:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ForgotPassword.css';

const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onSubmit(email);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default ForgotPassword;
```

2. Necessary CSS/styling:

```css
/* ForgotPassword.css */

.forgot-password-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.forgot-password-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.forgot-password-form label {
  display: block;
  margin-bottom: 10px;
}

.forgot-password-form input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.forgot-password-form .error {
  color: red;
  margin-bottom: 10px;
}

.forgot-password-form button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
```

3. PropTypes or TypeScript interfaces:

```jsx
ForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
```

4. Export statements:

```jsx
export default ForgotPassword;
```