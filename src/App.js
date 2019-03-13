import React, { Component } from 'react';
import './App.css';
import CesiumComponent from './CesiumComponent';

class App extends Component {

  render() {
      return (
          <CesiumComponent 
            homeButton={false}
          />
      );
  }
}

export default App;
