import { React, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ id, handlerClick, text }) => {
  return (
    <button id={id} onClick={handlerClick}>
      {text}
    </button>
  );
};

const Statistic = ({ text, value, unit }) => {
  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>
          {value}
          {unit ? " " + unit : ""}
        </td>
      </tr>
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  let total = good + neutral + bad;
  let avg = ((good * 1 + bad * -1) / total).toFixed(2);
  let pos = ((good * 100) / total).toFixed(2);
  if (total === 0) {
    return <p id="error">No feedback given</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Total" value={total} />
          <Statistic text="Average" value={avg} />
          <Statistic text="Positive" value={pos} unit="%" />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
  };
  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <div id="btn-group">
        <Button id="good" handlerClick={addGood} text="Good" />
        <Button id="neutral" handlerClick={addNeutral} text="Neutral" />
        <Button id="bad" handlerClick={addBad} text="Bad" />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
