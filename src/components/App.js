import React, { Component } from 'react';
import MoviesList from './MoviesList';
import TVShowsList from './TVShowsList';
import SearchResults from './SearchResults';
import Menu from './Menu';
import Home from './Home';
import { connect } from 'react-redux';
import { Route, Switch  } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div >
        <Menu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              path="/movies"
              component={MoviesList}
            />
            <Route
              path="/tvshows"
              component={TVShowsList}
            />
            <Route
              exact
              path="/search/:query"
              component={SearchResults}
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
