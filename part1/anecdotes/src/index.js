import { React, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const vote = () => {
    let newArr = [...votes];
    newArr[selected] += 1;
    setVotes(newArr);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p id="anecdote">{props.anecdotes[selected]}</p>
      <p id="votes">has {votes[selected]} votes</p>
      <div id="btn-group">
        <button id="vote" type="button" onClick={vote}>
          Vote
        </button>
        <button id="next" type="button" onClick={nextAnecdote}>
          Next anecdote
        </button>
      </div>
      <div id="winner">
        <h2>Anecdote with most votes</h2>
        <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      </div>
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
