import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <p>
      filter shown with
      <input value={value} onChange={onChange} />
    </p>
  );
};

export default Filter;
