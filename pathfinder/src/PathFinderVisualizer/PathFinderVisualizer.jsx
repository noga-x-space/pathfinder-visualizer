import { useEffect, useState } from "react";
import Node from "./Node/Node";
import StarAlgorithem from "./StarAlgorithem";

function PathFinderVisualizer({
  starterOn,
  wallOn,
  goalOn,
  nodes,
  setNodes,
  setStartNode,
  startNode,
  wallHistory,
  setWallHistory,
  // startCol,
  // setStartCol,
  // startRow,
  // setStartRow,
  index,
  setIndex,
}) {
  const [amount, setAmount] = useState(0); // just a node counter
  //vars to store the locations of the current start and goal nodes:
  const [startCol, setStartCol] = useState(null);
  const [startRow, setStartRow] = useState(null);
  const [goalCol, setGoalCol] = useState(null);
  const [goalRow, setGoalRow] = useState(null);

  // const gridrows = 15;
  // const gridcols = 45;
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
          isMarked: false,
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
        setStartNode([row, col]);
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

  // const handleNodeClick2 =

  //here we have 3 options: user chose a start, a goal, or to draw on a wall
  const handleNodeClick2 = (row, col) => {
    // Clone the nodes array and the row that contains the clicked node
    const newNodes = [...nodes];
    const newRow = [...newNodes[row]];

    const node = newRow[col];

    // Modify the clicked node
    if (starterOn) {
      // clearing current starting point

      if (startCol) newNodes[startRow][startCol].isStart = false;

      //is the user choosing a blank node
      if (!(node.isGoal || node.isWall || node.isStart)) {
        newRow[col] = { ...newRow[col], isStart: true };
        setStartCol(col);
        setStartRow(row);
        console.log("start node info: ", startRow, startCol);
        setStartNode([row, col]);
        // setStartNode({row, col});
        // startNode && console.log("startNode: ", startNode[0], startNode[1]);
      }
    } else if (goalOn) {
      //clearing prev goal
      if (goalCol) newNodes[goalRow][goalCol].isGoal = false;

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
  // const [wallHistory, setWallHistory] = useState([]); //an array of all of the walls added to the grid
  // const [index, setIndex] = useState(0); //the index of the wallHistory array, for undo and redo purposes
  // Start dragging

  const handleMouseDown = (row, col) => {
    if (wallOn) {
      setIsDragging(true);
      console.log(
        "mousedown- wall history: ",
        wallHistory.length,
        "wall history: ",
        wallHistory
      );
      addBrick(row, col);
      console.log("added brick: ", curBricks);
    }
  };

  const handleMouseOver = (row, col) => {
    console.log("mouse over adding brick");
    console.log(" is wall on? ", wallOn, "is wall dragging? ", isDragging);
    if (wallOn && isDragging) {
      //this should only take action whenever the wall creation button is chosen
      addBrick(row, col);
      console.log("mouse over added brick: ", curBricks.values);
      commitWallAdd();
    }
  };
  const handleMouseUp = () => {
    // setIsDragging(false);
    curBricks.length > 0 && commitWallAdd(curBricks);
  };

  //adding node to current wall
  const addBrick = (row, col) => {
    //handling same place repitition- if we don't already have this node
    if (
      curBricks.length == 0 || //this check is ESSENTIAL since otherwise "some" wouldn't work
      !curBricks.some(([r, c]) => {
        r == row && c == col;
      })
    ) {
      const newNodes = [...nodes];
      const newRow = [...newNodes[row]];
      newRow[col].isWall = true;
      newNodes[row] = newRow;
      setNodes(newNodes);
      setCurBricks((prevState) => [...prevState, [row, col]]);
    }
    console.log("added brick is", [...curBricks]);
  };

  const commitWallAdd = () => {
    setWallHistory((prevState) => {
      const updatedHistory = [...prevState];
      //if the user adds a new wall after undoing previous steps - remove them and add new ones
      if (index < wallHistory.length) {
        updatedHistory.splice(index, wallHistory - index, curBricks); //remove elements after index, add curBricks
      } else {
        updatedHistory.splice(index, 0, curBricks);
      }
      return updatedHistory;
    });

    setCurBricks([]);
    setIndex(index + 1);
    console.log(
      "commitWallAdd - newest wall is: ",
      wallHistory[wallHistory.length - 1],
      "the wall's length is: ",
      wallHistory.length,
      "the index is currently at",
      index
    );
  };

  //function adds the current bricks to the wall history
  //we assume curBricks isn't empty
  const commitWallAdd2 = () => {
    setWallHistory((prevState) => [...prevState]);

    const updatedHistory = [...wallHistory];

    //if the user adds a new wall after undoing previous steps - remove them and add new ones, otherwise just add new ones
    if (index < wallHistory.length) {
      updatedHistory.splice(index, wallHistory - index, curBricks); //remove elements after index, add curBricks
    } else {
      updatedHistory.splice(index, 0, curBricks);
    }

    setWallHistory(updatedHistory);
    console.log("commitWallAdd was called - wallHistory: ", wallHistory);
    setCurBricks([]);
    setIndex(index + 1);
    console.log(
      "commitWallAdd - newest wall is: ",
      wallHistory[wallHistory.length - 1],
      "the wall's length is: ",
      wallHistory.length,
      "the index is currently at",
      index
    );
  };

  //whenever the undo button is pressed
  const removeLastWallRender = () => {
    if (index > 0 && wallHistory[index]) {
      const lastWall = wallHistory[index - 1];

      // Create a new array with updates based on the last wall
      const updatedNodes = nodes.map((nodeRow, rowIndex) => {
        // Iterate over each row of the 2D nodes array
        return nodeRow.map((node, colIndex) => {
          // Check if this node is part of the last wall
          const isLastWallNode = lastWall.some(
            (lastWallNode) =>
              lastWallNode[0] === rowIndex && lastWallNode[1] === colIndex
          );

          // Return a new object with updated isWall if last wall node
          return { ...node, isWall: isLastWallNode ? false : node.isWall };
        });
      });

      // Update the state with the modified nodes array
      setNodes(updatedNodes);
    }
  };

  //whenever the redo is clicked
  const reviveLastWallRender = () => {
    const lastWall = wallHistory[wallHistory.length - 1];

    // Create a new array with updates based on the last wall
    const updatedNodes = nodes.map((nodeRow, rowIndex) => {
      // Iterate over each row of the 2D nodes array
      return nodeRow.map((node, colIndex) => {
        // Check if this node is part of the last wall
        const isLastWallNode = lastWall.some(
          (lastWallNode) =>
            lastWallNode[0] === rowIndex && lastWallNode[1] === colIndex
        );

        // Return a new object with updated isWall if last wall node
        return { ...node, isWall: isLastWallNode ? false : node.isWall };
      });
    });

    // Update the state with the modified nodes array
    setNodes(updatedNodes);
  };

  // useEffect(() => {
  //   if (index < wallHistory.length) removeLastWallRender();
  // }, [index]);
  

  const undo = () => {
    // move 1 back in wallHistory
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const redo = () => {
    // move 1 forward in wallHistory
    if (index < wallHistory.length) setIndex(index + 1);
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
              onMouseDown={() => handleMouseDown(node.row, node.col)}
              // onMouseUp={handleMouseUp}
              // onMouseOver={() => handleMouseOver(node.row, node.col)}
            />
          ))}
        </div>
      ))}
      <button id="testing-wall-add-functionality" onClick={commitWallAdd}>
        add this!
      </button>
      foo
    </div>
  );
}

export default PathFinderVisualizer;
