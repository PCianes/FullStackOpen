import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ exercises }) => <p>Number of exercises {exercises}</p>;

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ data }) =>
  data.map((part) => <Part part={part.title} exercises={part.total} />);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const data = [
    {
      title: part1,
      total: exercises1,
    },
    {
      title: part2,
      total: exercises2,
    },
    {
      title: part1,
      total: exercises1,
    },
  ];

  return (
    <>
      <Header course={course} />
      <Content data={data} />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
