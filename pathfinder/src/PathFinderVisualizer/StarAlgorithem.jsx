import React, { useEffect, useState } from "react";

const StarAlgorithem = ({ grid, start }) => {
  // const [curNode, setCurNode] = useState(start);

  console.log("algorithem started")
  const [minimumLength, setMinimumLength] = useState(Infinity);
  //starting point
  let col = start[1];
  let row = start[0];

  if (!grid) {
    return <div>Loading grid...</div>; // Conditional rendering
  }

  const max = grid[0] * grid[1] + 1;

  const algorithem = (row, col, length) => {
    if (col > grid[1] || col < 0 || row > grid[0] || row < 0) return Infinity;
    
    const curNode = grid[row][col];

    if (curNode.isGoal) {
      return length;
    }
    if (curNode.isStart || curNode.isMarked || curNode.isWall) {
      return Infinity;
    }

    // the current node isn't marked- count it
    curNode.isMarked = true;
    // curNode.style={{color: "pink"}}
    let tempmin1 = Math.min(
      algorithem(col + 1, row, length++),
      algorithem(col, row + 1, length++)
    );

    let tempmin2 = Math.min(
      algorithem(col - 1, row, length++),
      algorithem(col, row - 1, length++)
    );
    curNode.isMarked = false;
    return Math.min(tempmin1, tempmin2);
  };

  let tempmin1 = Math.min(
    algorithem(row + 1, col, max),
    algorithem(row, col + 1, max)
  );

  let tempmin2 = Math.min(
    algorithem(row - 1, col, max),
    algorithem(row, col - 1, max)
  );
  setMinimumLength(Math.min(tempmin1, tempmin2));

  // useEffect(()=>{return  Math.min(tempmin1, tempmin2)})
  return <div>StarAlgorithem, {minimumLength} is the minimal path length!</div>;
};

export default StarAlgorithem;
