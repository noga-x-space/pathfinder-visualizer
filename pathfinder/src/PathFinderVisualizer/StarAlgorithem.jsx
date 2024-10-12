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

  let col = start[1];
  let row = start[0];

  if (!grid || !grid[row] || !grid[row][col]) {
    return <div>Loading grid or invalid grid coordinates...</div>;
  }

  const algorithem = async (row, col, length) => {
    if (col >= grid[0].length || col < 0 || row >= grid.length || row < 0)
      return Infinity;

    const curNode = grid[row][col];

    // If the node is already marked or is a wall, skip it
    if (curNode.isStart || curNode.isMarked || curNode.isWall) return Infinity;

    // Mark the current node as visited
    curNode.isMarked = true;

    // Create a deep copy of the grid to trigger re-render
    const newGrid = [...grid];
    newGrid[row] = [...grid[row]];
    newGrid[row][col] = { ...curNode };

    // Update the grid in state
    setGrid(newGrid);

    // Delay for visualization purposes
    await new Promise((resolve) => setTimeout(resolve, 10));

    if (curNode.isGoal) {
      console.log("Hit goal! Length: ", length);
      return length;
    }

    // Explore all directions (down, right, up, left)
    let minPath = Math.min(
      await algorithem(row + 1, col, length + 1), // Move down
      await algorithem(row, col + 1, length + 1), // Move right
      await algorithem(row - 1, col, length + 1), // Move up
      await algorithem(row, col - 1, length + 1) // Move left
    );

    curNode.isMarked = false; // Unmark the node for backtracking
    return minPath;
  };

  // Start the recursive algorithm
  const runAlgorithm = async () => {
    let minPath = await Math.min(
      await algorithem(row + 1, col, 1),
      await algorithem(row, col + 1, 1),
      await algorithem(row - 1, col, 1),
      await algorithem(row, col - 1, 1)
    );
    setMinimumLength(minPath);
    console.log("Minimum Path Length: ", minPath);
  };

  useEffect(() => {
    runAlgorithm();
  }, []);

  return (
    <div>
      <h1>{isFinite(minimumLength) ? minimumLength : "Calculating..."}</h1>
      Star Algorithm: Minimum path length
    </div>
  );
};

export default StarAlgorithem;
