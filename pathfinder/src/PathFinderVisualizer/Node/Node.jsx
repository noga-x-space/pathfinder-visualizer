import React from "react";

const Node = ({ nodeData, onClick, onMouseDown, onMouseOver, onMouseUp }) => {
  const { row, col, isStart, isGoal, isWall, isMarked } = nodeData; // Destructure data from props

  const nodeStyle = {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    width: "40px",
    height: "40px", // Add height for a square grid
    margin: "0px",
    // backgroundColor: "grey",
    backgroundColor: isStart
      ? "green"
      : isGoal
      ? "red"
      : isWall
      ? "black"
      : isMarked
      ? "pink"
      : "white",
    // : "grey", // Set color conditionally
    // if isStart or isGoal then bg color blue
  };
  return (
    <div
      style={nodeStyle}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
    />
  ); // Render the node with styling
};

export default Node;
