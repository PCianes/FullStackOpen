import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ children }) => <h1>{children}</h1>;

const Button = ({ text, action }) => {
  const buttonStyle = {
    background: "#fff",
    border: "1px solid gray",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  };

  return (
    <button onClick={action} style={buttonStyle}>
      {text}
    </button>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const addVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const getRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const getBest = () => {
    let indexBest = 0;
    let max = 0;
    points.forEach((item, index) => {
      if (item > max) {
        max = item;
        indexBest = index;
      }
    });
    return indexBest;
  };

  return (
    <>
      <Title>Anecdote of the day</Title>
      <div>{anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <Button text="vote" action={addVote} />
      <Button text="next anecdote" action={getRandomAnecdote} />
      <Title>Anecdote with most votes</Title>
      <div>{anecdotes[getBest()]}</div>
      <p>has {points[getBest()]} votes</p>
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
