import { useEffect, useState } from "react";
import Node from "./Node/Node";

function PathFinderVisualizer({ starterOn, wallOn, goalOn }) {
  const [nodes, setNodes] = useState([]);
  const [amount, setAmount] = useState(0); // just a node counter
  //vars to store the locations of the current start and goal nodes:
  const [startCol, setStartCol] = useState(null);
  const [startRow, setStartRow] = useState(null);
  const [goalCol, setGoalCol] = useState(null);
  const [goalRow, setGoalRow] = useState(null);
  // const [bricks, setBricks] = useState([]);

  // i need to think about the functionality of how i see bricks

  //  METHOD 1
  //1. an array containing all the brick information: [[0,0], [8,5]]
  //2. is [row, col] in array? do nothing : push

  // METHOD 2
  //1. is nodes[row, col].isWall? if so do nothing, else push

  // METHOD 3
  //1. use method 1
  //2. each time the user clicks on a node, a new array is formed using the 1st methodology. each time it adds up
  //3. this method is good for track keeping: undo and redo changes
  // [[[1,2],[0,0],[13,13]], [1,1], [13,15]]

  const createNodes = () => {
    const tempnodes = [];
    let tempamount = 0;
    for (let row = 0; row < 15; row++) {
      const nodesInRow = [];
      for (let col = 0; col < 45; col++) {
        const node = {
          row: row,
          col: col,
          isStart: false,
          isGoal: false,
          isWall: false,
        };
        nodesInRow.push(node);
        tempamount++;
      }
      tempnodes.push(nodesInRow);
    }
    setAmount(tempamount);
    return tempnodes;
  };

  useEffect(() => {
    console.log("Nodes: ", nodes);
    setNodes(createNodes());
  }, []);

  const handleNodeClick1 = (row, col) => {
    console.log("button clicked!");
    // Clone the nodes array and the row that contains the clicked node
    const newNodes = [...nodes];
    const newRow = [...newNodes[row]];

    // Modify the clicked node directly
    if (starterOn) {
      // User chooses a start node
      if (startCol != null) {
        // Clearing current starting point
        newNodes[startRow][startCol].isStart = false;
      }
      if (!newRow[col].isGoal) {
        // Not occupied by goal
        newRow[col].isStart = true;
        newRow[col].isGoal = false;
        setStartCol(col);
        setStartRow(row);
      }
    } else {
      // User chooses a goal node
      if (goalCol != null) {
        // Clearing prev goal
        newNodes[goalRow][goalCol].isGoal = false;
      }
      if (!newRow[col].isStart) {
        // Not occupied by start
        newRow[col].isStart = false;
        newRow[col].isGoal = true;
        setGoalCol(col);
        setGoalRow(row);
      }
    }

    console.log(
      "new node's info is:  newRow[col].isGoal:",
      newRow[col].isGoal,
      " newRow[col].isStart ",
      newRow[col].isStart
    );
    // Update the specific row in the newNodes array
    newNodes[row] = newRow;

    // Update state with the modified nodes array
    setNodes(newNodes);
  };

  const isOccupied = (node) => {
    return node.isGoal || node.isWall || node.isStart;
  };

  //here we have 3 options: user chose a start, a goal, or to draw on a wall
  const handleNodeClick2 = (row, col) => {
    // Clone the nodes array and the row that contains the clicked node
    const newNodes = [...nodes];
    const newRow = [...newNodes[row]];

    const node = newRow[col];

    // Modify the clicked node
    if (starterOn) {
      // clearing current starting point
      newNodes[startRow][startCol].isStart = false;

      //is the user choosing a blank node
      if (!(node.isGoal || node.isWall || node.isStart)) {
        newRow[col] = { ...newRow[col], isStart: true };
        setStartCol(col);
        setStartRow(row);
      }

      
    } else if (goalOn) {
      //clearing prev goal
      newNodes[goalRow][goalCol].isGoal = false;

      if (!(node.isGoal || node.isWall || node.isStart)) {
        //the user chooses a goal node
        if (!newRow[col].isStart) {
          newRow[col] = { ...newRow[col], isGoal: true };
          setGoalCol(col);
          setGoalRow(row);
        }
      }
    }
    //user is drawing a wall
    else {
      if (!(node.isGoal || node.isWall || node.isStart)) {
        newRow[col] = { ...newRow[col], isWall: true };
      }
    }

    console.log(
      "new node's info is:  newRow[col].isGoal:",
      newRow[col].isGoal,
      " newRow[col].isStart ",
      newRow[col].isStart
    );
    // Update the specific row in the newNodes array
    newNodes[row] = newRow;

    // Update state with the modified nodes array
    setNodes(newNodes);
  };

  /////// handling wall creation
  const [isDragging, setIsDragging] = useState(false);
  const [curBricks, setCurBricks] = useState([]); // the latest addition of bricks to the wall
  const [wallHistory, setWallHistory] = useState([]); //an array of all of the walls added to the grid
  const [index, setIndex] = useState(0); //the index of the wallHistory array, for undo and redo purposes
  // Start dragging
  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    // addWallNode(row, col); // First node in the drag event
  };

  const handleMouseOver = (row, col) => {
    if (wallOn && isDragging) {
      //this should only take action whenever the wall creation button is chosen
      addBrick(row, col);
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    curBricks.length > 0 && commitWallAdd(curBricks);
  };

  //adding node to current wall
  const addBrick = (row, col) => {
    //handling same place repitition- if we don't already have this node
    if (
      !curBricks.some(([r, c]) => {
        r == row && c == col;
      })
    ) {
      const newNodes = [...nodes];
      const newRow = newNodes[row];
      newRow[col].isWall = true;
      newNodes[row] = newRow;
      setNodes(newNodes);
      setCurBricks(...curBricks, [row, col]);
    }
  };
  const commitWallAdd = () => {
    //we assume curBricks isn't empty

    if (index < wallHistory.length) {
      //if the user adds a new wall after undoing previous steps
      const updatedHistory = [...wallHistory];
      updatedHistory.splice(index, wallHistory - index, curBricks); //remove elements after index, add curBricks
      setWallHistory(updatedHistory);
    }
    setCurBricks([]);
    setIndex(index++);
    console.log("newest wall is: ", wallHistory[wallHistory.length - 1]);
  };
  const undo = () => {
    // move 1 back in wallHistory
    if (index > 0) {
      setIndex(index--);
    }
  };
  const redo = () => {
    // move 1 forward in wallHistory
    if (index < wallHistory.length) setIndex(index++);
  };

  return (
    <div className="pathfinder">
      {/* {amount} */}
      {nodes.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((node, nodeID) => (
            <Node
              key={nodeID}
              nodeData={node}
              onClick={() => handleNodeClick2(node.row, node.col)}
              //can I prevent these events here if it isn't wallOn?
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseOver={handleMouseOver}
            />
          ))}
        </div>
      ))}
      foo
    </div>
  );
}

export default PathFinderVisualizer;
