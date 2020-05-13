import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ exercises }) => <p>Number of exercises {exercises}</p>;

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part, i) => (
    <Part key={i} part={part.name} exercises={part.exercises} />
  ));

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const total = course.parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={total} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
