import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            displayError: false
        };
    }

    incrementCounter = () => {
        this.setState({
            counter: this.state.counter + 1,
            displayError: this.state.counter + 1 <= 0
        });
    }

    decrementCounter = () => {
        this.setState({
            counter: this.state.counter > 0 ? this.state.counter - 1 : 0,
            displayError: this.state.counter <= 0
        });
    }

    render() {
        return (
            <div data-test="component-app">
                <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
                <button 
                    data-test="increment-button" 
                    onClick={this.incrementCounter}>
                    Increment counter
                </button>
                <button 
                    data-test="decrement-button" 
                    onClick={this.decrementCounter}>
                    Decrement counter
                </button>
                <span className="error" style={{display: this.state.displayError ? 'inline' : 'none'}}>the counter can't go below zero</span>
            </div>
        );
    }
}

export default App;
