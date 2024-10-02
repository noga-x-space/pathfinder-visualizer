import React, { useState } from "react";

function Header({ projName, starterOn, setStarterOn }) {
  const styles = {
    width: "100vw",

    // width: "100%;",
    textAlign: "center",
    backgroundColor: "red",
    // display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  };

  return (
    <div style={styles}>
      <h1>{projName}</h1>
      <div className="game-settings">
        <button
          className="buttons"
          onClick={() => {
            console.log("starterOn? ", starterOn);
            setStarterOn(true);
            
            console.log("and now? ", starterOn);
          }}
          style={{ backgroundColor: starterOn ? "white" : "lightgray" }}
        >
          SELECT START NODE
        </button>
        <button
          className="buttons"
          onClick={() => {
            setStarterOn(false);
            console.log("starterOn? ", starterOn);
          }}
          style={{ backgroundColor: !starterOn ? "white" : "lightgray" }}
        >
          SELECT GOAL NODE
        </button>
      </div>
    </div>
  );
}

export default Header;
