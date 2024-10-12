import React, { useEffect, useState } from "react";
import undoImage from "../assets/undo.png";
import redoImage from "../assets/redo.png";

function Header({
  projName,
  starterOn,
  setStarterOn,
  wallOn,
  setWallOn,
  goalOn,
  setGoalOn,
  runAlgorithm,
  wallHistory,
  index,
  setIndex,
  nodes,
  setNodes,
}) {
  const [selectedValue, setSelectedValue] = useState("star");

  const handleAlgorithemChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRedo = () => {
    if (index < wallHistory.length) {
      redoLastWallRender();
      setIndex(index + 1);
    }
  };
  const handleUndo = () => {
    if (index > 0) {
      console.log("undo should theoretically work now");
      removeLastWallRender();
      setIndex(index - 1);
    } else console.log("index too low, won't undo");
  };

  //whenever the undo button is pressed
  const removeLastWallRender = () => {
    console.log("undo activated");
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
  };

  //whenever the redo is clicked
  const redoLastWallRender = () => {
    console.log("redoing....");
    const nextWall = wallHistory[index];

    if (!nextWall || nextWall.length == 0) return;

    // Create a new array with updates based on the last wall
    const updatedNodes = nodes.map((nodeRow, rowIndex) => {
      // Iterate over each row of the 2D nodes array
      return nodeRow.map((node, colIndex) => {
        // Check if this node is part of the last wall
        const isNextWallNode = nextWall.some(
          (nextWallNode) =>
            nextWallNode[0] === rowIndex && nextWallNode[1] === colIndex
        );

        // Return a new object with updated isWall if last wall node
        return { ...node, isWall: isNextWallNode ? true : node.isWall };
      });
    });

    // Update the state with the modified nodes array
    setNodes(updatedNodes);
  };

  const styles = {
    // width: "100vw",

    // width: "100%",
    textAlign: "center",
    backgroundColor: "pink",
    // display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: "20px",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  };
  // useEffect(() => {
  // starterOn && setWallOn(false) && setGoalOn(false);
  // goalOn && setStarterOn(false) && setWallOn(false);
  // wallOn && setStarterOn(false && setGoalOn(false));
  // if (starterOn) {
  //   setGoalOn(false);
  //   setWallOn(false);
  // }
  // if (goalOn) {
  //   setStarterOn(false);
  //   setWallOn(false);
  // }
  // if (wallOn) {
  //   setStarterOn(false);
  //   setWallOn(false);
  // }
  // }, [starterOn, goalOn, wallOn]);

  // useEffect hook to re-render on index change
  useEffect(() => {
    // No need to do anything here, the component will re-render when index changes
  }, [index]);

  return (
    <div style={styles}>
      <h1>{projName}</h1>
      <div
        className="game-settings"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <select
          value={selectedValue}
          onChange={handleAlgorithemChange}
          style={{ fontSize: "1rem", marginRight: "10rem", position: "static" }}
        >
          <option value={"star"}>pathfinding star algorithem</option>
          <option value={"op2"}>second algorithem</option>
          <option value={"op3"}>3rd algorithem</option>
        </select>
        <button
          id="runBTN"
          onClick={() => {
            runAlgorithm();
            console.log("node at 1,1 ismarked? ", nodes[1][1]);
          }}
          style={{ backgroundColor: "turquoise" }}
        >
          Run Algorithm
        </button>

        <div className="buttons">
          <button
            id="startBTN"
            onClick={() => {
              setStarterOn(true);
              setWallOn(false);
              setGoalOn(false);
            }}
            style={{ backgroundColor: starterOn ? "white" : "lightgray" }}
          >
            SELECT START NODE
          </button>
          <button
            id="goalBTN"
            onClick={() => {
              setGoalOn(true);
              setStarterOn(false);
              setWallOn(false);
            }}
            style={{ backgroundColor: goalOn ? "white" : "lightgray" }}
          >
            SELECT GOAL NODE
          </button>
          <button
            id="wallBTN"
            onClick={() => {
              setWallOn(true);
              setStarterOn(false);
              setGoalOn(false);
            }}
            style={{ backgroundColor: wallOn ? "white" : "lightgray" }}
          >
            DRAW WALL
          </button>
        </div>

        <button id="undo" onClick={handleUndo}>
          <img src={undoImage} style={{ width: "20px", height: "20px" }}></img>
        </button>
        <button id="redo" onClick={handleRedo}>
          <img src={redoImage} style={{ width: "20px", height: "20px" }}></img>
        </button>
        <h2>index is {index}</h2>
        {/* {starterOn ? (
          <h3 style={{ backgroundColor: "green" }}>
            choosing a starting node...
          </h3>
        ) : (
          <h3>choosing a goal node...</h3>
        )} */}
      </div>
    </div>
  );
}

export default Header;
