Here's an example of a simple React component that uses CSS-in-JS with media queries for responsiveness. The component is a simple card with a title and description.

```jsx
// Necessary imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled-components for CSS-in-JS
const CardContainer = styled.div`
  padding: 20px;
  margin: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;

  // Add responsiveness for mobile devices
  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Description = styled.p`
  font-size: 1em;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

// Main component
const ResponsiveCard = ({ title, description }) => (
  <CardContainer>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </CardContainer>
);

// Prop Types for component
ResponsiveCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Export statement
export default ResponsiveCard;
```

For testing on different screen sizes, you can use Chrome DevTools (or similar tools in other browsers) to simulate different device sizes or you can use real devices if available. Furthermore, you can also use libraries like 'react-testing-library' for automated testing on different screen sizes. 

Please note that this is a simple example and real-world components could be more complex. You might need to consider other styles or layout techniques for different kinds of components.