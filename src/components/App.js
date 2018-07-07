import React, { Component } from 'react';
import MoviesList from './MoviesList';
import Menu from './Menu';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    const { movies } = this.props.movies;
    return (
      <div>
        <Menu />
        <MoviesList />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  ...state
})


export default connect(mapStateToProps)(App);
