import React from "react";
import "./Alert.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillWarning } from "react-icons/ai";

const Alert = ({ message, type }) => {
  var typeClass;
  switch (type) {
    case "success":
      typeClass = "alert-success";
      break;
    case "warning":
      typeClass = "alert-warning";
      break;
    case "error":
      typeClass = "alert-error";
      break;
    case "info":
      typeClass = "alert-info";
      break;
    default:
      typeClass = "alert-warning";
  }

  return (
    <div className={`alert ${typeClass}`}>
      {type === "success" ? (
        <AiFillCheckCircle size={24} />
      ) : type === "error" ? (
        <AiFillCloseCircle size={24} />
      ) : type === "info" ? (
        <AiFillInfoCircle size={24} />
      ) : (
        <AiFillWarning size={24} />
      )}
      {message}
    </div>
  );
};

export default Alert;
