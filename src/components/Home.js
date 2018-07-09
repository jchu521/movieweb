import React, { Component } from 'react';
import '../App.css';
import MostPopular from './MostPopular';
import TopRated from './TopRated';
// import LatestMovies from './LatestMovies';

class Home extends Component {



  render() {
    return(
        <div>
          {/*<LatestMovies />*/}
          <TopRated />
          <MostPopular />
        </div>
    )
  }
}

export default Home;
