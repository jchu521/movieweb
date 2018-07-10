import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import { Row, Button, ButtonGroup } from 'react-bootstrap';

let buttonArray = [];

class PagesButton extends Component {
  state={
    isReady: false,
  }

  componentDidMount(){
    const { isMovies } = this.props;

    buttonArray=[];
    if(isMovies){
      buttonArray=[];
      for(let i =1; i <  this.props.movies.movies.total_pages+1; i++){
         buttonArray.push(<Button onClick={() => this.tooglePage(i)} key={i} >{i}</Button>)
         this.setState({
           isReady: true,
         })
      }
    }else if(!isMovies){
      buttonArray=[];
      for(let i =1; i <  this.props.tvShows.tvShows.total_pages+1; i++){
         buttonArray.push(<Button onClick={() => this.tooglePage(i)} key={i} >{i}</Button>)
         this.setState({
           isReady: true,
         })
      }
    }

  }

  tooglePage = (page) => {
    const {isShowing, isMovies } = this.props;
    if(isMovies){
      if(this.props.movies.search){
        this.props.searchByMovieName(this.props.movies.query , page)
      }else if(isShowing && !this.props.movies.search){
        this.props.getNowPlaying(page);
      }else if(!isShowing && !this.props.movies.search){
        this.props.getUpcoming(page);
      }
    }else if(!isMovies){
      if(this.props.tvShows.search){
        this.props.searchByMovieName(this.props.tvShows.query , page)
      }else if(isShowing && !this.props.tvShows.search){
        this.props.getOnAirTVShows(page);
      }else if(!isShowing && !this.props.tvShows.search){
        this.props.getAiringTodayTVShows(page);
      }
    }
  }

  render() {
    console.log(this);
    return (
      <Row>
        <ButtonGroup>
          {this.state.isReady && buttonArray}
        </ButtonGroup>
      </Row>
    );
  }
}

const mapStateToProps = (state)=>({
  ...state
})

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesButton);
