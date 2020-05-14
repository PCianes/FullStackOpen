import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, getRandomAnecdote }) => {
  const buttonStyle = {
    background: "#fff",
    border: "1px solid gray",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  };

  return (
    <button onClick={getRandomAnecdote} style={buttonStyle}>
      {text}
    </button>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  const getRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <Button text="next anecdote" getRandomAnecdote={getRandomAnecdote} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
