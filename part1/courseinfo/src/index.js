import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Part = ({ part, exercise }) => (
  <>
    <p className="part">
      {part} {exercise}
    </p>
  </>
);
const Header = ({ course }) => (
  <>
    <h1>{course}</h1>
  </>
);
const Content = ({ parts }) => {
  const [part1, part2, part3] = parts;
  return (
    <>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part3.exercises} />
    </>
  );
};
const Total = ({ parts }) => {
  let sum = 0;
  parts.map((part) => {
    return (sum += part.exercises);
  });
  return (
    <>
      <p className="part">Number of exercises {sum}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
