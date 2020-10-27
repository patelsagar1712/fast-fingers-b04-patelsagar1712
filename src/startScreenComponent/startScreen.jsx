import React, { Component } from "react";
import CountDownTimer from "../timerCounter/Countdown";
import data from "../data/dictionary.json";
import "../startScreenComponent/startScreen.css";
class startScreen extends Component {
  constructor(props) {
    super(props);
    this.currentState = {
      name: "",
      difficulty: 0,
      selecteddifficulty: "Easy",
      currDifficulty: 0,
      startGameFlag: false,
      startTimeFlag: false,
      gameOverFlag: false,
      currentWord: "",
      currentScore: 0,
      userInput: "",
      easyWords: [],
      mediumWords: [],
      hardWords: [],
    };
    this.state = { ...this.currentState };
    this.scoreList = [];
    let easyWordFlag = true,
      medWordFlag = true,
      hardWordFlag = true;

    for (let word of data) {
      if (word.length <= 4 && easyWordFlag) {
        this.state.easyWords.push(word);
      } else if (word.length <= 8 && medWordFlag)
        this.state.mediumWords.push(word);
      else if (hardWordFlag) this.state.hardWords.push(word);

      if (this.state.easyWords.length === 150) easyWordFlag = false;
      if (this.state.mediumWords.length === 150) medWordFlag = false;
      if (this.state.hardWords.length === 500) hardWordFlag = false;
    }
  }
  state = {};
  // Iconawesomekeyboard = {
  //   backgroundImage: 'url("../images/Icon awesome-keyboard@2x.png")',
  //   backgroundRepeat: "no-repeat",
  //   width: "19%",
  //   zIndex: 1,
  //   top: "60px",
  //   left: "80px",
  // };
  addName = (e) => {
    this.setState({ name: e.target.value });
  };
  selectDifficulty = (e) => {
    this.setState({ selectDifficulty: e.target.value });
  };
  saveValue = () => {
    this.setDifficulty();
    this.setState({ startGameFlag: true, startTimeFlag: true });
  };
  getScoreList = () => {
    if (this.scoreList.length === 0) {
      return;
    }
    const scoresList = this.scoreList.map((score, i) => (
      <p key={i} className="text">{`Score #${i + 1}: ${score}`}</p>
    ));
    return scoresList;
  };
  onGameOver = () => {
    this.scoreList.push(this.state.currentScore);
    this.setState({ ...this.state, gameOverFlag: true });
  };

  setDifficulty = () => {
    let difficultyFactor;
    let difficulty = this.state.selectDifficulty;
    let newWord;
    if (difficulty === "Easy" || difficulty === undefined) {
      difficulty = "Easy";
      difficultyFactor = 1;
      const random = Math.round(
        Math.random() * (this.state.easyWords.length - 1)
      );
      newWord = this.state.easyWords[random].toUpperCase();
    } else if (difficulty === "Medium") {
      difficultyFactor = 1.5;
      const random = Math.round(
        Math.random() * (this.state.mediumWords.length - 1)
      );
      newWord = this.state.mediumWords[random].toUpperCase();
    } else {
      difficultyFactor = 2;
      const random = Math.round(
        Math.random() * (this.state.hardWords.length - 1)
      );
      newWord = this.state.hardWords[random].toUpperCase();
    }
    const timeForWord = Math.floor(newWord.length / difficultyFactor) + 1;
    this.setState({
      ...this.state,
      startTimer: true,
      currentWord: newWord,
      timeForWord: timeForWord,
      selectDifficulty: difficulty,
      difficulty: difficulty,
      difficultyFactor: difficultyFactor,
      currDifficulty: difficultyFactor,
    });
  };

  getCurrentWordComponent = () => {
    const wordCharacters = this.state.currentWord.split("");
    const userInputCharacters = this.state.userInput.split("");
    return (
      <div className="new-word">
        {wordCharacters.map((char, i) => {
          let color;
          if (i < this.state.userInput.length) {
            color = char === userInputCharacters[i] ? "green" : "red";
          }
          return (
            <span key={i} style={{ color: color }}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };
  setScore = (value) => {
    this.setState({ ...this.state, currentScore: value });
  };
  onPlayAgain = () => {
    this.setState(
      { ...this.INITIAL_STATE, gameOverFlag: false, userInput: "" },
      this.setDifficulty
    );
  };
  getNewWord = (words, difficultyFactor = null) => {
    if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
      const random = Math.round(Math.random() * (words.length - 1));
      return words[random].toUpperCase();
    }
    if (difficultyFactor < 1.5) {
      const random = Math.round(Math.random() * (words.length - 1));
      return words[random].toUpperCase();
    }
    const random = Math.round(Math.random() * (words.length - 1));
    return words[random].toUpperCase();
  };
  onUserInput = (e) => {
    const value = e.target.value.toUpperCase();
    if (value === this.state.currentWord) {
      const difficultyFactor = this.state.difficultyFactor + 0.01;

      let level, words;
      if (difficultyFactor >= 2) {
        level = "Hard";
        words = this.state.hardWords;
      } else if (difficultyFactor < 1.5) {
        level = "Easy";
        words = this.state.easyWords;
      } else {
        level = "Medium";
        words = this.state.mediumWords;
      }

      if (this.state.level !== level) console.log("level changed!");

      const newWord = this.getNewWord(words, difficultyFactor);
      const timeForWord = Math.floor(newWord.length / difficultyFactor) + 1;

      this.setState({
        ...this.state,
        currentWord: newWord,
        userInput: "",
        timeForWord: timeForWord,
        level: level,
        difficulty: level,
        difficultyFactor: parseFloat(difficultyFactor.toFixed(1)),
      });
    } else {
      this.setState({ ...this.state, userInput: value });
    }
  };

  render() {
    console.log(this.state);
    let counterComponent;
    if (this.state.gameOverFlag) {
      return (
        <div className="text-center text">
          <h1>GAME OVER!!!!!</h1>
          <br></br>
          <h1>{`Your Score ${this.state.currentScore}`}</h1>
          <br></br>
          <button onClick={this.onPlayAgain}>Play Again</button>
        </div>
      );
    }
    if (this.state.startTimeFlag) {
      counterComponent = (
        <CountDownTimer
          timeForWord={this.state.timeForWord}
          onGameOver={this.onGameOver}
          word={this.state.currentWord}
          setScore={this.setScore}
        />
      );
    }
    if (this.state.startGameFlag === true) {
      return (
        <React.Fragment>
          <div>
            <div>
              <div className="row">
                <div className="col-md-6 lg md sm ">
                  <div className="textHeader">{this.state.name}</div>
                </div>
                <br />
                <div
                  className="col-md-6  lg md sm"
                  style={{ textAlign: "right" }}
                >
                  <div className="textHeader">
                    LEVEL: {this.state.difficulty}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 lg md sm">
                  <div className="textHeader">Fast Fingers</div>
                </div>
                <br />
                <div className="col-6 lg md sm" style={{ textAlign: "right" }}>
                  <div className="textHeader">
                    Current Score : {this.state.currentScore}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <div className="row mt-2">
                  <div className="text-center">
                    <div className="scores-box">
                      <div className="mt-2">
                        <h3 className="text">Scores</h3>
                        {this.getScoreList()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div className="div-timer text-center">
                  <div className="timer">{counterComponent}</div>
                  <br></br>
                  {this.getCurrentWordComponent()}
                  <br></br>
                  <input
                    value={this.state.userInput}
                    onChange={this.onUserInput}
                    className="input-box"
                    autoFocus
                  ></input>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="positionSet">
            <div style={this.Iconawesomekeyboard}></div>
            <div>
              <div>
                <h1>Fast Finger</h1>
              </div>
              <input
                type="text"
                value={this.state.name}
                onChange={this.addName}
                required
                className="input-box"
              />
              <br></br>
              <select
                selected="Easy"
                style={{
                  border: "solid 1px #ffffff",
                  width: "352px",
                  borderRadius: "15px",
                  boxshadow: "0 3px 16px 0 rgba(0, 0, 0, 0.8)",
                }}
                onChange={this.selectDifficulty}
                className="input-box"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <br></br>
              <button className="start-game" onClick={this.saveValue}>
                Start Game
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default startScreen;
