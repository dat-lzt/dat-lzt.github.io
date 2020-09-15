import React, { Component } from 'react';
import {HashRouter,Route} from 'react-router-dom';
import Main from './Main';
import Btn from './components/Btn';
import './App.css';
import New from './New';

class App extends Component {
  render() {
    return (
     <HashRouter>
      <div className="App">
      <Btn/>
      <Main />
      </div>
     </HashRouter>
    );
  }
}

export default App;
