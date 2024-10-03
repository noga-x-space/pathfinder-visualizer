import React, { useEffect, useState } from "react";

function Header({
  projName,
  starterOn,
  setStarterOn,
  wallOn,
  setWallOn,
  goalOn,
  setGoalOn,
}) {
  const [selectedValue, setSelectedValue] = useState("star");

  const handleAlgorithemChange = (event) => {
    setSelectedValue(event.target.value);
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
