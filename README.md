# Pathfinder Visualizer

This is a personal project I created for fun to visualize pathfinding algorithms. 

**Note:** This project is a work in progress. Currently, it implements a backtracking algorithm for pathfinding, with plans to integrate additional algorithms, including A*, Dijkstra, and BFS. Stay tuned for updates as new algorithms are added!

## Table of Contents
- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Pathfinding Algorithms](#pathfinding-algorithms)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)



## Overview
This PathFinder Visualizer demonstrates a backtracking algorithm that finds a path between two nodes on a grid. As development progresses, additional algorithms will be implemented, and the user experience will improve with more features and functionality.



## Demo
#### a video of the website and an image provided:




![image of the screen](/smiley-demo.png)


<!--- ### [Screen Recording](/demo.mp4) --->

#### a video demo:
![Demo Video Preview](demo_vid.gif)


## Features
- **Set Start and Goal Nodes:** Users can select a start and a goal node on the grid.
- **Draw Walls:** Add obstacles on the grid that the algorithm must navigate around.
- **Run Backtracking Algorithm:** The current implementation uses a backtracking approach to find a path from start to goal.
- **Planned Features:** Future updates will include more algorithms, interactive controls, and enhanced UI elements.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/noga-x-space/pathfinder-visualizer.git
   cd pathfinder-visualizer

2. Install dependencies:
   ```bash
   npm install

3. Start the application
   ```bash
   npm start
The app will run locally on http://localhost:3000.

## Usage
- Select Start Node: Click on the "Set Start Node" button, then click a node on the grid.
- Select Goal Node: Click on the "Set Goal Node" button, then click a node on the grid.
- Draw Walls: Use the "Draw Wall" button to place obstacles.
- Run Backtracking Algorithm: Click "Run Algorithm" to see the pathfinding process in action. The algorithm attempts to reach the goal while avoiding walls.


## Project Structure
```plaintext
.
├── src
│   ├── PathFinderVisualizer/
│   │   ├── Header.jsx              # Header with controls (start, goal, wall, run algorithm)
│   │   ├── PathFinderVisualizer.jsx # Main grid component
│   │   └── BacktrackingAlgorithm.js # Implementation of the backtracking algorithm
│   └── App.js                      # Main app component
├── public/
│   ├── index.html                  # HTML template
│   └── assets/                     # Icons and other static files
└── README.md                       # Project README
```
## Pathfinding Algorithms
Backtracking Algorithm
The Backtracking Algorithm explores nodes on the grid by recursively checking paths from the start node to the goal node. It backtracks when it encounters walls or paths that do not lead to the goal. While not always the most efficient, it serves as a foundational algorithm for this visualizer.

## Planned Algorithms
A Algorithm*: Efficiently finds the shortest path using heuristics.
Dijkstra’s Algorithm: Finds the shortest path by exploring all possible paths.
Breadth-First Search: Suitable for unweighted grids.
## Future Improvements
Additional Algorithms: Adding A*, Dijkstra, and BFS.
Improved User Interface: Enhanced grid customization and algorithm controls.
**Path Weighting: Support for weighted paths to represent different terrain costs.
Enhanced Interactivity: Features like drag-and-drop functionality for start and goal nodes, making it easier to reposition them on the grid.

Algorithm Speed Control: Allow users to adjust the speed of the visualization, making it possible to slow down or speed up the algorithm's progress.
Mobile Compatibility: Improve the UI for mobile and tablet devices, enabling a seamless experience across platforms.
Algorithm Comparison Mode: Let users compare different algorithms side-by-side to see how they differ in finding paths.
These improvements will elevate the PathFinder app.


## Contributing
Feel free to contribute by forking the repository and submitting a pull request!

## License
This project is open-source and available under the MIT License.  - 

