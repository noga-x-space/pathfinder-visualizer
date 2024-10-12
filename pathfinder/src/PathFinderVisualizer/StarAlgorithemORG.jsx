import React, { useEffect, useState } from "react";
import "./StarAlgorithem.css";

const StarAlgorithem = ({
  grid,
  setGrid,
  start,
  goal,
  minimumLength,
  setMinimumLength,
}) => {
  console.log("running star algorithm");
  // const [curNode, setCurNode] = useState(start);
  // const [minimumLength, setMinimumLength] = useState(Infinity);
  // const [counter, setCounter] = useState(0);

  //starting point
  let col = start[1];
  let row = start[0];

  if (!grid || !grid[row] || !grid[row][col]) {
    return <div>Loading grid or invalid grid coordinates...</div>;
  }

  console.log("row, col are", row, col);

  console.log(
    "star algorithm /n start: ",
    start[0],
    start[1],
    "goal: ",
    goal[0],
    goal[1]
  );

  const max = grid[0].length * grid.length + 1;

  console.log("//////////////////////////////");
  console.log("length: ", length);

  const algorithem = (row, col, length) => {
    if (col >= grid[0].length || col < 0 || row >= grid.length || row < 0)
      return Infinity;

    const curNode = grid[row][col];
    //the style should be implemented

    if (curNode.isStart || curNode.isMarked || curNode.isWall) {
      return Infinity;
    }

    console.log("row, col are", row, col);

    if (curNode.isGoal) {
      console.log("hit goal!", goal, "in length of: ", length);
      return length;
    }

    // the current node isn't marked- count it
    curNode.isMarked = true;
    console.log(`Marking node at ${row},${col} as marked`, curNode.isMarked);
    // Use React's setGrid function to trigger a re-render with the updated grid
    const newGrid = [...grid];
    newGrid[row][col] = curNode;
    setGrid(newGrid); // Trigger a re-render with updated state

    // Recursively check all four directions: down, right, up, left.
    let minPath = Math.min(
      algorithem(row + 1, col, length + 1), // Move down
      algorithem(row, col + 1, length + 1), // Move right
      algorithem(row - 1, col, length + 1), // Move up
      algorithem(row, col - 1, length + 1) // Move left
    );

    curNode.isMarked = false;
    return minPath;
  };

  let minPath = Math.min(
    algorithem(row + 1, col, 1),
    algorithem(row, col + 1, 1),
    algorithem(row - 1, col, 1),
    algorithem(row, col - 1, 1),
    max
  );

  setMinimumLength(minPath);
  console.log(minPath);
  return (
    <button>
      <h1>{minimumLength}</h1>
      StarAlgorithem, is the minimal path length!
    </button>
  );
};

export default StarAlgorithem;
