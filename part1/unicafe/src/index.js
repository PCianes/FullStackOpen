import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ children }) => <h1>{children}</h1>;
const Button = ({ text, addFeedback }) => {
  const buttonStyle = {
    background: "#fff",
    border: "1px solid gray",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <button onClick={addFeedback} style={buttonStyle}>
      {text}
    </button>
  );
};

const Result = ({ text, count }) => (
  <p>
    {text} {count}
  </p>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Title>give feedback</Title>
      <Button text="good" addFeedback={() => setGood(good + 1)} />
      <Button text="neutral" addFeedback={() => setNeutral(neutral + 1)} />
      <Button text="bad" addFeedback={() => setBad(bad + 1)} />
      <Title>statistics</Title>
      <Result text="good" count={good} />
      <Result text="neutral" count={neutral} />
      <Result text="bad" count={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
