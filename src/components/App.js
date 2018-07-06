import React, { Component } from 'react';
import CurrentOrUpcmoingMovies from './CurrentOrUpcomingMovies';
import Menu from './Menu';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div>
        <Menu />
        <CurrentOrUpcmoingMovies />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  ...state
})


export default connect(mapStateToProps)(App);
