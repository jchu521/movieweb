import React, { Component } from 'react';
import '../App.css';
import { Well, Row, Col } from 'react-bootstrap';
import C from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class LatestMovies extends Component {
  state={
    isReady: false,
  }

  componentDidMount(){
    this.props.getLatestMovies();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.movies.latestMovies){
      this.setState({isReady: true});
    }
  }

  render() {
    const { latestMovies } = this.props.movies;
    const { isReady  } = this.state;
    console.log(this);
    return(
      <Well className="App" style={{margin:20}}>
        <h3>News</h3>
        <h6>TV Shows</h6>
        <Row>
          {isReady &&
            <Col style={{ paddingBottom: 80}} xs={12} sm={4} md={3} lg={2} key={latestMovies.id}>
                <h6>{latestMovies.title}</h6>
                {latestMovies.poster_path !== null ?
                  <img
                    style={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: 300,
                      width: '100%',
                    }}
                    src={C.Image_URL + latestMovies.poster_path} alt={latestMovies.title}/>
                    :
                  <h6 style={{
                    height: 290,
                    width:'100%',
                    textAlign:'center',
                  }}> No image found </h6>
                }
            </Col>
          }
        </Row>
      </Well>
    )
  }
}

const mapStateToProps = (state)=>({
  ...state
})

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestMovies);
