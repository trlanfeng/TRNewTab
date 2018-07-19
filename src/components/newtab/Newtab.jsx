import React from "react";
import ReactDom from "react-dom";

import TopBar from './TopBar.jsx'

class Newtab extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="game">
        <TopBar />
      </div>
    );
  }
}

module.exports = Newtab;