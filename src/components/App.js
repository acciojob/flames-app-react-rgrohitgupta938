import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: "",
      name2: "",
      relationship: "",
    };
  }

  removeCommonCharacters = (str1, str2) => {
    let str1Arr = str1.split("");
    let str2Arr = str2.split("");

    str1Arr.forEach((char) => {
      const indexInStr2 = str2Arr.indexOf(char);
      if (indexInStr2 !== -1) {
        str2Arr[indexInStr2] = "";
        str1Arr[str1Arr.indexOf(char)] = "";
      }
    });

    const remainingStr1 = str1Arr.filter((char) => char !== "").join("");
    const remainingStr2 = str2Arr.filter((char) => char !== "").join("");

    return { remainingStr1, remainingStr2 };
  };

  calculateRelationship = () => {
    const { name1, name2 } = this.state;

    const { remainingStr1, remainingStr2 } = this.removeCommonCharacters(
      name1,
      name2
    );

    const sumOfLengths = (remainingStr1.length + remainingStr2.length) % 6;

    let relationshipStatus = "";
    switch (sumOfLengths) {
      case 1:
        relationshipStatus = "Friends";
        break;
      case 2:
        relationshipStatus = "Love";
        break;
      case 3:
        relationshipStatus = "Affection";
        break;
      case 4:
        relationshipStatus = "Marriage";
        break;
      case 5:
        relationshipStatus = "Enemy";
        break;
      case 0:
        relationshipStatus = "Siblings";
        break;
      default:
        relationshipStatus = "Please Enter valid input";
    }

    this.setState({ relationship: relationshipStatus });
  };

  clearInputs = () => {
    this.setState({ name1: "", name2: "", relationship: "" });
  };

  render() {
    const { name1, name2, relationship } = this.state;

    return (
      <div id="main">
        <div className="row">
          <input
            type="text"
            id="input1"
            name="name1"
            value={name1}
            onChange={(e) => this.setState({ name1: e.target.value })}
            data-testid="input1"
          />

          <input
            type="text"
            name="name2"
            id="input2"
            value={name2}
            onChange={(e) => this.setState({ name2: e.target.value })}
            data-testid="input2"
          />

          <button
            onClick={this.calculateRelationship}
            data-testid="calculate_relationship"
          >
            Calculate Relationship
          </button>
          <button onClick={this.clearInputs} data-testid="clear">
            Clear
          </button>
          <h3 data-testid="answer">{relationship}</h3>
        </div>
      </div>
    );
  }
}

export default App;
