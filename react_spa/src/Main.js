import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import Mine from './components/Mine';
import Friend from './components/Friend';
// import './App.css';

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/Mine">Mine</NavLink></li>
                        <li><NavLink to="/Friend">Friend</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/Mine" component={Mine}></Route>
                        <Route path="/Friend" component={Friend}></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}
export default Main;
