import React, { Component } from "react";
import _ from "lodash";
import "./global.css";
import Fade from "react-reveal/Fade";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

function calcFault(pageList) {
  var faults = 0;

  for (var i = 0; i < pageList.length; i++) {
    if (pageList[i] == "F") {
      faults++;
    }
  }
  return faults;
}

function calcHit(pageList) {
  var hits = 0;

  for (var i = 0; i < pageList.length; i++) {
    if (pageList[i] == "H") {
      hits++;
    }
  }
  return hits;
}

export default class Table extends Component {
  render() {
    let {
      referenceString,
      frameNumber,
      algorithmLabel,
      algorithm,
      colorMap,
      resetTurns,
      swapToggle,
      animationToggle,
      detailToggle,
      dataArr,
    } = this.props;
    let { pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray } =
      algorithm(referenceString, frameNumber, resetTurns);
    let frameNumberArray = _.range(0, frameNumber, 1);

    var hitRatio = (calcHit(pageFaults) / pageFaults.length).toPrecision(2);

    dataArr.push(hitRatio);

    return (
      <div>
        <label>
          <u>{algorithmLabel + ":"}</u>
        </label>
        <div className="table-responsive">
          <table className="table table-bordered table-sm table-custom-style">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: "40px" }}>Reference:</th>
                {referenceString.map((r) =>
                  animationToggle ? (
                    <Fade right>
                      <th
                        style={{ backgroundColor: "#B8DAFF", border: "0px" }}
                      />
                      <th
                        className="table-cell-align-center"
                        style={{ borderColor: "black" }}
                      >
                        {r}
                      </th>
                    </Fade>
                  ) : (
                    <th
                      className="table-cell-align-center"
                      style={{ border: "1px solid black" }}
                    >
                      {r}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {frameNumberArray.map((f) => (
                <tr>
                  <th />
                  {pageInMemArray.map((r, index) =>
                    animationToggle ? (
                      <Fade right>
                        <th
                          style={{ backgroundColor: "#B8DAFF", border: "0px" }}
                        />
                        <th
                          className={" table-cell-align-center"}
                          style={{ backgroundColor: "white", width: "100px" }}
                        >
                          {r[f]}
                          {detailToggle ? (
                            <sub>
                              <sub>
                                {referenceMapArray[index]
                                  ? referenceMapArray[index].get(r[f])
                                  : ""}
                              </sub>
                            </sub>
                          ) : (
                            ""
                          )}
                        </th>
                      </Fade>
                    ) : (
                      <th
                        className={" table-cell-align-center"}
                        style={{ border: "1px solid black" }}
                      >
                        {r[f]}
                        {detailToggle ? (
                          <sub>
                            <sub>
                              {referenceMapArray[index]
                                ? referenceMapArray[index].get(r[f])
                                : ""}
                            </sub>
                          </sub>
                        ) : (
                          ""
                        )}
                      </th>
                    )
                  )}
                </tr>
              ))}
              {swapToggle
                ? frameNumberArray.map((f) => (
                    <tr className="thead-light">
                      <th />
                      {pageNotInMemArray.map((r) =>
                        animationToggle ? (
                          <Fade right>
                            <th
                              style={{
                                backgroundColor: "#B8DAFF",
                                borderRadius: "0px",
                              }}
                            />
                            <th
                              className="table-cell-align-center"
                              style={{
                                border: "1px solid black",
                                backgroundColor: "#BEE5EB",
                                color: "black",
                              }}
                            >
                              {r[f]}
                            </th>
                          </Fade>
                        ) : (
                          <th
                            className="table-cell-align-center"
                            style={{ border: "1px solid black" }}
                          >
                            {r[f]}
                          </th>
                        )
                      )}
                    </tr>
                  ))
                : null}
              <tr className="thead-dark">
                <th>Page Fault:</th>

                {pageFaults.map((f) =>
                  animationToggle ? (
                    <Fade right>
                      <th
                        style={{ backgroundColor: "#B8DAFF", border: "0px" }}
                      />
                      <th className="table-cell-align-center">{f}</th>
                    </Fade>
                  ) : (
                    <th className="table-cell-align-center">{f}</th>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Number of Page Faults: <span className="span">{calcFault(pageFaults)}</span></h3>
        <h3>Number of Page Hits: <span className="span">{calcHit(pageFaults)}</span></h3>
        <h3>
          Hit Ratio: <span className="span">{(calcHit(pageFaults) / pageFaults.length).toPrecision(2)}</span>
        </h3>
      </div>
    );
  }
}