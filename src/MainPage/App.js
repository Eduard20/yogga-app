import React, { Component } from 'react';
import MainHeader from './main_header/index'
import Create from './CreateForm/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainHeader/>
        <Create />
      </div>
    );
  }
}

export default App;
