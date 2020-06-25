import React from 'react';

const Total: React.FC<{ count: number }> = ({ count }) => (
  <p>Number of exercises {count}</p>
);

export default Total;
