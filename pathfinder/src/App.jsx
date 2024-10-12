import Header from "./PathFinderVisualizer/Header";
import PathFinderVisualizer from "./PathFinderVisualizer/PathFinderVisualizer";
import { useEffect, useState } from "react";
import StarAlgorithem from "./PathFinderVisualizer/StarAlgorithem";

function App() {
  ////// grid vars
  const [starterOn, setStarterOn] = useState(true); // is the "setStart" button on?
  const [wallOn, setWallOn] = useState(false);
  const [goalOn, setGoalOn] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [goalNode, setGoalNode] = useState(null);

  ////// history vars
  const [wallHistory, setWallHistory] = useState([]); //an array of all of the walls added to the grid
  const [index, setIndex] = useState(0); //the index of the wallHistory array, for undo and redo purposes

  ////// algorithm vars
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("star");
  const [minimumLength, setMinimumLength] = useState(Infinity);

  const runAlgorithm = () => {
    if (nodes.length > 0 && startNode && goalNode) {
      console.log("running the selected algorithm: ", selectedAlgorithm);
      const newGrid = [...nodes];

      //later there will be more algorithms
      switch (selectedAlgorithm) {
        case "star":
          setMinimumLength(
            StarAlgorithem({
              grid: newGrid,
              start: startNode,
              goal: goalNode,
              minimumLength: minimumLength,
              setMinimumLength: setMinimumLength,
              setGrid: setNodes,
            })
          );
      }
    }
  };

  return (
    <>
      {nodes && startNode && goalNode && (
        <button>
          {" "}
          <StarAlgorithem
            grid={[...nodes]}
            start={startNode}
            goal={goalNode}
            minimumLength={minimumLength}
            setMinimumLength={setMinimumLength}
            setGrid={setNodes}
          />
          click me
        </button>
      )}
      {/* <h2>
        min length is:{" "}
        {isFinite(minimumLength) ? minimumLength : "Calculating..."}
      </h2>{" "} */}
      <Header
        projName={"Path Finder Visualizer"}
        starterOn={starterOn}
        setStarterOn={setStarterOn}
        wallOn={wallOn}
        setWallOn={setWallOn}
        goalOn={goalOn}
        setGoalOn={setGoalOn}
        runAlgorithm={runAlgorithm}
        wallHistory={wallHistory}
        setIndex={setIndex}
        index={index}
        nodes={nodes}
        setNodes={setNodes}
      />
      <PathFinderVisualizer
        starterOn={starterOn}
        wallOn={wallOn}
        goalOn={goalOn}
        nodes={nodes}
        setNodes={setNodes}
        setStartNode={setStartNode}
        startNode={startNode}
        goalNode={goalNode}
        setGoalNode={setGoalNode}
        wallHistory={wallHistory}
        setWallHistory={setWallHistory}
        // startCol={startCol}
        // setStartCol={setStartCol}
        // startRow={startRow}
        // setStartRow={setStartRow}
        index={index}
        setIndex={setIndex}
      ></PathFinderVisualizer>
      hello
    </>
  );
}

export default App;
