import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component{

  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };

  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ monsters: users }));
  }

  /* Javascript by default doesn't set its scope of 'this' so to have it recognized
  that's why we create the function as equal to an arrow function (e) =>  */
  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render() {
    const { monsters, searchField } = this.state;
    /* above destructuring code is the same as below lines of code
    const monsters = this.state.monsters;
    const searchField = this.state.searchField; */
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monsters'
          handleChange = {this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList> 
      </div>
    )
  }
}

export default App;
