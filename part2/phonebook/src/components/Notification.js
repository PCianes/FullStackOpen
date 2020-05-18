import React from "react";

export default Notification = ({ message, type = "success" }) => {
  if (message === null) {
    return null;
  }

  return <div className={`notification notification--${type}`}>{message}</div>;
};
