import React from "react";

const Node = ({ nodeData, onClick }) => {
  const { row, col, isStart, isGoal } = nodeData; // Destructure data from props

  const nodeStyle = {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    width: "40px",
    height: "40px", // Add height for a square grid
    margin: "0px",
    // backgroundColor: "grey",
    backgroundColor: isStart ? "green" : isGoal ? "red" : "grey", // Set color conditionally
    // if isStart or isGoal then bg color blue
  };
  return <div style={nodeStyle} onClick={onClick} />; // Render the node with styling
};

export default Node;
