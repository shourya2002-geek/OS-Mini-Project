import React, { Component } from "react";
import Header from "./Components/Header";
import Tables from "./Components/Tables";
import { refStringGen } from "./stringGen";
import "font-awesome/css/font-awesome.css";
import List from "./Components/List";

import { Bar } from "react-chartjs-2";
import "./App.css";

import {
  FIFO,
  LRU,
  LFU
} from "./algorithms";

var dataArr = [];
class App extends Component {
  
  state = {
    graph: false,
    referenceInputTextField: "0,2,3,1,2,1,4,5,6,2,4,5,3,2,3,8,5,7,2,0,6,4,1,9",
    referenceString: [
      "0",
      "2",
      "3",
      "1",
      "2",
      "1",
      "4",
      "5",
      "6",
      "2",
      "4",
      "5",
      "3",
      "2",
      "3",
      "8",
      "5",
      "7",
      "2",
      "0",
      "6",
      "4",
      "1",
      "9",
    ],
    frameNumber: 4,
    resetTurns: 4,
    swapToggle: false,
    animationToggle: true,
    detailToggle: false,
    selectedAlgorithm: { name: "FIFO" },
  };

  handleGraph = ({graph}) => {
    this.setState({graph: true});
  };

  handleRefChange = ({ target }) => {
    let { value } = target;
    if (
      value.match(/^$|^[0-9,]+$/) &&
      !value.match(/,,+,*|[0-9][0-9]+[0-9]*/g)
    ) {
      let tempReferenceString = [...value.split(",")];
      let filteredReferenceString = tempReferenceString.filter(
        (value) => value !== ""
      );
      this.setState({
        referenceInputTextField: value,
        referenceString: filteredReferenceString,
      });
    }
  };

  handleFrameChange = ({ target }) => {
    if ((target.value <= 7 && target.value >= 3) || target.value == 0)
      this.setState({ frameNumber: target.value });
  };

  handleResetTurnsChange = ({ target }) => {
    if (target.value <= 9 && target.value >= 0)
      this.setState({ resetTurns: target.value });
  };

  handleSwapToggle = () => {
    this.setState({ swapToggle: !this.state.swapToggle });
  };

  handleRefStringGenClick = () => {
    let tempReferenceStringInput = refStringGen(24, 9);
    let tempReferenceString = [...tempReferenceStringInput.split(",")];
    let filteredReferenceString = tempReferenceString.filter(
      (value) => value !== ""
    );
    this.setState({
      referenceInputTextField: tempReferenceStringInput,
      referenceString: filteredReferenceString,
    });
  };

  handleAnimationToggle = () => {
    this.setState({ animationToggle: !this.state.animationToggle });
  };

  handleDetailToggle = () => {
    this.setState({ detailToggle: !this.state.detailToggle });
  };

  handleListChange = (algorithm) => {
    this.setState({ selectedAlgorithm: algorithm, graph: false });
  };

  

  render() {
    
    let {
      frameNumber,
      resetTurns,
      referenceString,
      referenceInputTextField,
      swapToggle,
      animationToggle,
      detailToggle,
      selectedAlgorithm,
      graph,
    } = this.state;
    let {
      handleRefChange,
      handleFrameChange,
      handleResetTurnsChange,
      handleRefStringGenClick,
      handleAnimationToggle,
      handleSwapToggle,
      handleListChange,
      handleDetailToggle,
      handleGraph
    } = this;
    const algorithms = [
      { name: "First In First Out", f: FIFO },
      { name: "Least Recently Used", f: LRU },
      { name: "Least Frequently Used", f: LFU },
    ];
    const filteredAlgorithm =
      selectedAlgorithm && selectedAlgorithm["f"]
        ? algorithms.filter((a) => a["name"] === selectedAlgorithm["name"])
        : algorithms.filter((a) => a["name"] == "First In First Out");
    return (
      <div className="outer-cont">
        <main className="container">
          <div className="list">
            <div className="col">
              <Header
                handleRefChange={handleRefChange}
                handleFrameChange={handleFrameChange}
                handleResetTurnsChange={handleResetTurnsChange}
                handleRefStringGenClick={handleRefStringGenClick}
                handleSwapToggle={handleSwapToggle}
                handleAnimationToggle={handleAnimationToggle}
                handleDetailToggle={handleDetailToggle}
                detailToggle={detailToggle}
                frameNumber={frameNumber}
                resetTurns={resetTurns}
                referenceInputTextField={referenceInputTextField}
                animationToggle={animationToggle}
                swapToggle={swapToggle}
                handleGraph={handleGraph}
              />
            </div>
            <div className="list-comp col-5">
              <List
                algorithms={algorithms}
                handleListChange={handleListChange}
                selectedAlgorithm={selectedAlgorithm}
              />
            </div>
          </div>

          {graph ? (
            <div style={{ maxWidth: "650px" }}>
              <Bar
                data={{
                  // Name of the variables on x-axies for each bar
                  labels: ["FIFO", "Second Chance", "LRU", "LFU"],
                  datasets: [
                    {
                      // Label for bars
                      label: "Hit Ratio",
                      // Data or value of your each variable
                      data: dataArr,
                      // Color of each bar
                      backgroundColor: ["aqua", "green", "red", "yellow"],
                      // Border color of each bar
                      borderColor: ["aqua", "green", "red", "yellow"],
                      borderWidth: 0.5,
                    },
                  ],
                }}
                // Height of graph
                height={400}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          // The y-axis value will start from zero
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    labels: {
                      fontSize: 15,
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div>
              <Tables
                frameNumber={frameNumber}
                resetTurns={resetTurns}
                referenceString={referenceString}
                swapToggle={swapToggle}
                animationToggle={animationToggle}
                detailToggle={detailToggle}
                algorithms={filteredAlgorithm}
                dataArr={dataArr}
              />
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default App;
