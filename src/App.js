import React, { Component } from "react";
import "./App.css";

const cities = [
    "Baltimore",
    "Cleveland",
    "New Dehli",
    "Moscow",
    "Paris",
    "Dublin",
    "Detroit",
    "Naples",
    "Milan",
    "New York",
    "Chicago",
    "Hong Kong",
    "London",
    "Sydney",
    "Shanghai",
    "Toronto"
];

// Use React hooks for extra credit!

/*
function App() {
  return (
    <div className="App"></div>;
  )
}
*/

class App extends Component {
    constructor() {
        super();
        this.state = {
            userInput: "",
            cities: [],
            selected: false,
        }
    }

    componentDidMount() {
        this.setState({ cities: cities.sort() });
    }

    onChange = (e) => {
        const userInput = e.currentTarget.value;
        const citiesList = cities;
        const filteredCities = citiesList.filter(
            city =>
            city.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({ userInput: userInput, cities: filteredCities, selected: true });
    }


    handleClick = () => {
        if (!this.state.selected) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({ selected: true });
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }

        this.setState({ selected: false });
    }

    getItem = (item) => {
        let start = item.toLowerCase().indexOf(this.state.userInput.toLowerCase());
        if (this.state.userInput.length < 1) {
            return item;
        }
        return <span>
          <span>{item.substring(0, start)}</span>
          <span className = 'App__listItem-highlight'>{item.substring(start, start+this.state.userInput.length)}</span>
          <span>{item.substring(start+this.state.userInput.length)}</span>
        </span>

    }

    onListItemClick = (item) => {
        const citiesList = cities;
        const filteredCities = citiesList.filter(
            city =>
            city.toLowerCase().indexOf(item.toLowerCase()) > -1
        );
        this.setState({ selected: false, userInput: item, cities: filteredCities })
    }

    render() {
        let listItems = [];

        if (this.state.selected) {
            listItems = this.state.cities.map(item => {
                return <li key={item} className = 'App__listItem' onClick={() => this.onListItemClick(item)}>
                  {this.getItem(item)}
                </li>
            })
        }

        return (
            <div className="App" >
              <div ref={node => this.node = node}>
                <input
                  className = 'App__input'
                  type="text"
                  onClick={this.handleClick}
                  onChange={this.onChange}
                  value={this.state.userInput}
                />
                <ul className = 'App__list'>
                  {listItems}
                </ul>
              </div>
            </div>
        );
    }
}

export default App;