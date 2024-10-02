import { useEffect, useState } from "react";
import Node from "./Node/Node";

function PathFinderVisualizer(starterOn) {
  //needs to get the start button status as props?
  const [nodes, setNodes] = useState([]);
  const [amount, setAmount] = useState(0); // just a node counter
  //vars to store the locations of the current start and goal nodes:
  const [startCol, setStartCol] = useState(null);
  const [startRow, setStartRow] = useState(null);
  const [goalCol, setGoalCol] = useState(null);
  const [goalRow, setGoalRow] = useState(null);

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

  const handleNodeClick2 = (row, col) => {
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
  const handleNodeClick1 = (row, col) => {
    console.log("button clicked!");
    // Clone the nodes array and the row that contains the clicked node
    const newNodes = [...nodes];
    const newRow = [...newNodes[row]];

    // Modify the clicked node
    if (starterOn) {
      // the user chooses a start node
      if (startCol != null) {
        // clearing current starting point
        newNodes[startRow][startCol].isStart = false;
      }
      if (!newRow[col].isGoal) {
        //is the user choosing a currently occupied spot?
        newRow[col] = { ...newRow[col], isStart: true };

        setStartCol(col);
        setStartRow(row);
      }
    } else {
      //the user chooses a goal node
      if (goalCol != null) {
        //clearing prev goal
        newNodes[goalRow][goalCol].isGoal = false;
      }
      if (!newRow[col].isStart) {
        newRow[col] = { ...newRow[col], isGoal: true };
        setGoalCol(col);
        setGoalRow(row);
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

  return (
    <div className="pathfinder">
      {amount}
      {nodes.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((node, nodeID) => (
            <Node
              key={nodeID}
              nodeData={node}
              onClick={() => handleNodeClick2(node.row, node.col)}
            />
          ))}
        </div>
      ))}
      foo
    </div>
  );
}

export default PathFinderVisualizer;
