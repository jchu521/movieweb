import React, { Component } from 'react';
import MoviesList from './MoviesList';
import Menu from './Menu';
import { connect } from 'react-redux';
import { Route, Switch  } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div >
        <Menu />
          <Switch>
            <Route exact path='/' />
            <Route
              path="/movies"
              component={MoviesList}
            />
          </Switch>
      </div >
    );
  }
}

const mapStateToProps = (state)=>({
  ...state
})

export default connect(mapStateToProps)(App);
