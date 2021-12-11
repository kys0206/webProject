import React from "react";

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        position: "relative",
        left: "15%",
        width: "70%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

export default HorizonLine;