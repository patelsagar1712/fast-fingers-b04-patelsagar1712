import React, { Component } from "react";
import { Link } from "react-router-dom";

class startScreen extends Component {
  state = {
    name: "",
    difficulty: "",
    currDifficulty: "",
  };
  styleBackground = {
    backgroundImage: "url( '../../Group 243.svg' )",
    //backgroundRepeat: "no-repeat",
    backgroundHeight: "100%",
    width: "100%",
    height: "1000px",
    zIndex: -1,
  };

  Iconawesomekeyboard = {
    backgroundImage: "url('../../Icon awesome-keyboard.png')",
    backgroundRepeat: "no-repeat",
    //backgroundPosition: "absolute",
    // width: "234.2px",
    height: "156.1px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "19%",
    zIndex: 1,
  };
  PositionSet = {
    backgroundPosition: "center",
    textAlign: "center",
    margin: "auto",
    //width: "75%",
    padding: "50px",
  };
  TextBox = {
    //width: "275px",
    //height: "62px",
    opacity: "0.20",
    borderRadius: "15px",
    boxShadow: "0 3px 16px 0 rgba(0, 0, 0, 0.8)",
    backgroundColor: "#ffffff",
  };
  TextWord = {
    //width: "396px",
    // height: "81px",
    fontFamily: "LaserCorpsGradient",
    fontSize: "30px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "normal",
    margin: "auto",
    color: "var(--light-red)",
  };
  addName = (e) => {
    this.setState({ name: e.target.value });
  };
  selectDifficulty = (e) => {
    this.setState({ difficulty: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div style={this.styleBackground}>
          <div style={this.PositionSet}>
            <div style={this.Iconawesomekeyboard}></div>
            <div style={this.TextWord}>
              <div>
                <h1>Fast Finger</h1>
              </div>
              <input
                type="text"
                value={this.state.name}
                onChange={this.addName}
                required
              />
              <br></br>
              <select
                placeholder="Easy"
                style={{
                  border: "solid 1px #ffffff",
                  width: "352px",
                  borderRadius: "15px",
                  boxshadow: "0 3px 16px 0 rgba(0, 0, 0, 0.8)",
                }}
                onChange={this.selectDifficulty}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <br></br>
              <button onClick={Link} to="/startGame">
                START GAME
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default startScreen;
