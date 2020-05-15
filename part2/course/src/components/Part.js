import React from "react";

const Part = ({ data }) => {
  return (
    <p>
      {data.name} <span>{data.exercises}</span>
    </p>
  );
};

export default Part;
