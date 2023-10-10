//import Component from react
import React, { Component } from "react";
import CardArray from "../components/CardArray";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

//need a class(App) in order to use state
class App extends Component {
  //needs a constructor
  constructor() {
    // needs a super
    super();
    //use this.state to activate
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  //when making your own func, you have to make it an arrow funtion
  onSearchChange = event => this.setState({ searchfield: event.target.value });

  //with a class, you need a render() with a value inside
  //use this.state.robots because it's an obj

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchfield.toLowerCase())
    );
    //if there length is falsy, return Loading
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      //else, return the <div>
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardArray robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
