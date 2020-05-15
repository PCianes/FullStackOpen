import React from "react";
import Header from "./Header";
import Content from "./Content";

const getTotalExercises = (parts) => {
  return parts.reduce((total, part) => total + part.exercises, 0);
};

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <p>
        <strong>total of {getTotalExercises(course.parts)} exercises</strong>
      </p>
    </>
  );
};

export default Course;
