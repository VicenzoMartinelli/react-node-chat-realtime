import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/(|login)/" exact component={Login}></Route>
          <Route path="/timeline" component={Timeline}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
