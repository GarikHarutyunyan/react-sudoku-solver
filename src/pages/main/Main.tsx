import React from "react";
import { Grid } from "./components/Grid";
import "./main.scss";
import { Solver } from "./Solver";

class Main extends React.Component {
  numMatrix = Array(9).fill(Array(9).fill(0));

  state = {
    objMatrix: this.numMatrix.map((row) => {
      return row.map((val: any) => {
        return { value: val, color: "black" };
      });
    }),
    activeCell: { x: 0, y: 0 },
  };

  onActiveCellChange = (y: number, x: number) => {
    this.setState({
      activeCell: { x: x, y: y },
    });
  };

  clearAllCells = () => {
    Array(9)
      .fill(Array(9).fill(0))
      .forEach((row: any, y: number) => {
        return row.forEach((num: any, x: number) => {
          return this.changeNum(y, x, num);
        });
      });
  };

  cleanCell = () => {
    const { activeCell } = this.state;
    const { x, y } = activeCell;

    this.changeNum(y, x, 0);
  };

  onNumChange = (newX: number, newY: number) => {
    const { activeCell } = this.state;
    const { x, y } = activeCell;
    const newNum = 3 * newX + newY + 1;

    this.changeNum(y, x, newNum);
  };

  changeNum = (y: number, x: number, num: number) => {
    const { objMatrix } = this.state;
    let newMatrix = objMatrix;

    newMatrix[y][x].value = num;
    newMatrix[y][x].color = "black";
    this.setState({
      objMatrix: newMatrix,
    });
  };

  solveProblem = () => {
    const solver = new Solver(this.state.objMatrix);
    const newObjMatrix = solver.run();

    this.setState({
      objMatrix: newObjMatrix,
    });
  };

  render() {
    const { objMatrix, activeCell } = this.state;
    const numBoard = [
      [
        { value: 1, color: "black" },
        { value: 2, color: "black" },
        { value: 3, color: "black" },
      ],
      [
        { value: 4, color: "black" },
        { value: 5, color: "black" },
        { value: 6, color: "black" },
      ],
      [
        { value: 7, color: "black" },
        { value: 8, color: "black" },
        { value: 9, color: "black" },
      ],
    ];

    const controlButtons = [
      [
        {
          value: "Clean Cell",
          color: "black",
          onClick: this.cleanCell,
        },
      ],
      [{ value: "Clear All", color: "black", onClick: this.clearAllCells }],
      [{ value: "Solve", color: "black", onClick: this.solveProblem }],
    ];

    return (
      <div className={"main"}>
        <Grid
          matrix={objMatrix}
          activeCell={activeCell}
          onCellClick={this.onActiveCellChange}
        />
        <Grid matrix={numBoard} onCellClick={this.onNumChange} />
        <Grid
          matrix={controlButtons}
          onCellClick={this.onNumChange}
          cellsClassName={"cell_for-text"}
        />
      </div>
    );
  }
}

export { Main };
