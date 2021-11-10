import React from "react";

const Header = ({ header }) => {
  return <h2>{header}</h2>;
};

const Total = ({ parts }) => {
  const sum = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  return (
    <p>
      <b>Number of exercises {sum}</b>
    </p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default Course;
