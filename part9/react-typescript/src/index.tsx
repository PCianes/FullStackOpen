import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Total from './components/Total';
import Content from './components/Content';

import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Jamstack',
      exerciseCount: 19,
      description: 'This is the present now',
      year: 2020,
    },
  ];

  const totalParts = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total count={totalParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
