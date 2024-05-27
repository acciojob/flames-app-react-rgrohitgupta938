import React, { Component, useState } from "react";
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

  calculateRelationship = () => {
    const { name1, name2 } = this.state;

    const lowercaseName1 = name1.toLowerCase();
    const lowercaseName2 = name2.toLowerCase();

    let remainingName1 = lowercaseName1
      .split("")
      .filter((char) => !lowercaseName2.includes(char))
      .join("");
    let remainingName2 = lowercaseName2
      .split("")
      .filter((char) => !lowercaseName1.includes(char))
      .join("");

    const sumOfLengths = (remainingName1.length + remainingName2.length) % 6;

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
