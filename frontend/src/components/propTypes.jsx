Here's a simple example of how you might create a homepage for a software house game builder. 

```jsx
// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css'; // Importing a CSS module

// Define propTypes for the component
const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Homepage functional component  
const HomePage = ({ title, description }) => {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulating an HTTP request
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return the component JSX
  return (
    <div className="homePage">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

// Assign propTypes to HomePage
HomePage.propTypes = propTypes;

export default HomePage;
```

In the above code, I've created a functional component named `HomePage` that accepts two props, `title` and `description`. It also contains a loading state `isLoading` that simulates an HTTP request using `useEffect` hook. If the component is in a loading state, it will return a loading message. Once loading is complete, it will render the title and description.

Here's the accompanying CSS module (HomePage.css):

```css
.homePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.homePage h1 {
  font-size: 2.5em;
  color: #333;
}

.homePage p {
  font-size: 1.2em;
  color: #666;
}
```

This CSS module provides basic styling for the HomePage component. The `.homePage` selector styles the component container, and the `h1` and `p` selectors style the title and description, respectively.