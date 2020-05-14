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

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
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
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
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
