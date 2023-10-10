//import Component from react
import React, { useEffect, useState } from "react"
import CardArray from "../components/CardArray"
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll"
import "./App.css"

const App = () => {
  const [robots, setRobots] = useState([])
  const [searchfield, setsearchfield] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        setRobots(users)
      })
  }, [])

  //when making your own func, you have to make it an arrow funtion
  //takes in the user input
  const onSearchChange = event => setsearchfield(event.target.value)

  //returns robot.name if it includes letters in the search field
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  })
  //if the length is falsy, return Loading
  return !robots.length ? (
    <h1>Loading</h1>
  ) : (
    //else, return the <div>
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardArray robots={filteredRobots} />
      </Scroll>
    </div>
  )
}

export default App
