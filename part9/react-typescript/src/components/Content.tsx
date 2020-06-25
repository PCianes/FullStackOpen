import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{
  parts: CoursePart[];
}> = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
