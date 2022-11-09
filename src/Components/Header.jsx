import React, { Component } from "react";
import "./global.css";
import "font-awesome/css/font-awesome.css";
import { HelpModal } from "./Modal";

export default class Header extends Component {
  render() {
    let {
      handleRefChange,
      handleFrameChange,
      handleResetTurnsChange,
      handleRefStringGenClick,
      handleSwapToggle,
      handleAnimationToggle,
      frameNumber,
      referenceInputTextField,
      resetTurns,
      animationToggle,
      swapToggle,
      handleDetailToggle,
      detailToggle,
      handleGraph
    } = this.props;
    return (
      <div>
        <div className="">
          <div className="jumbotron bg-transparent component">
            <div className="container">
              <h1 className="header display-5">
                Simulation of Page Replacement Algorithms
              </h1>
              <p className="lead">Operating Systems Mini Project</p>
            </div>
          </div>
          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="addon-wrapping"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter reference string 0~9 separated with ','"
              >
                Reference String
              </span>
            </div>
            <input
              type="text"
              name="referenceInputTextField"
              className="form-control"
              placeholder="Reference string [0-9] separated with ','"
              value={referenceInputTextField}
              onChange={handleRefChange.bind(this)}
            />
          </div>
          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="addon-wrapping"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter number 3~7"
              >
                Frame Number
              </span>
            </div>
            <input
              ref="frameNumber"
              type="number"
              min="3"
              max="7"
              className="form-control"
              placeholder="Frame number [3-7]"
              value={frameNumber}
              onChange={handleFrameChange.bind(this)}
            />
          </div>

          <button
            type="button"
            className="round"
            onClick={handleRefStringGenClick}
          >
            Generate String
          </button>


          

        </div>
      </div>
    );
  }
}