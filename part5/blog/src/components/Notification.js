import React from "react";

export default Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification notification--${message.type}`}>
      {message.text}
    </div>
  );
};
