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

const Data = ({ label, data }) => (
  <p>
    {label} {data}
  </p>
);

const Statistics = ({ title, data: { good, neutral, bad } }) => {
  const total = good + neutral + bad;
  const average = good > 0 || bad > 0 ? (good - bad) / total : 0;
  const positive = good > 0 ? (good / total) * 100 + " %" : "0 %";

  if (total === 0) {
    return (
      <>
        <Title>{title}</Title>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <Title>{title}</Title>
      <Data label="good" data={good} />
      <Data label="neutral" data={neutral} />
      <Data label="bad" data={bad} />
      <Data label="all" data={total} />
      <Data label="average" data={average} />
      <Data label="positive" data={positive} />
    </>
  );
};

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
      <Statistics title="statistics" data={{ good, neutral, bad }} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
