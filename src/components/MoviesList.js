import React, { Component } from 'react';
import '../App.css';
import { getMovie, getMovieVideos } from '../utils/moviesAPI';
import PagesButton from '../utils/pagesButton';
import { Well, Row, Col, Button, Modal, ButtonGroup } from 'react-bootstrap';
import C from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class MoviesList extends Component {

  state = {
    isReady: false,
    show:false,
    movie: null,
    genres: null,
    isShow: true,
    videos: null,
  }

  componentDidMount(){
    this.props.getNowPlaying();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.movies.message ==='Not Found'){
      this.setState({isReady: false})
    }else if(nextProps.movies.message ==='Found'){
      this.setState({isReady: true})
    }
  }

  handleClose = () => {
    this.setState({
      movie: null,
      show: false,
      videos: null
    });
  }

  handleShow = (movieId) => {
    getMovie(movieId).then((data) =>
      this.setState({
        movie: data,
      })
    ).then( () =>
      getMovieVideos(movieId).then( (d) =>
        this.setState({
          videos: d.results.map(v => C.Youtube_URL + v.key),
          show: true,
        })
      )
    )
  }

  handleGetMovies = (type) => {
    switch (type) {
      case 'Now':
        this.props.getNowPlaying();
        this.setState({isShow: true})
        break;
      case 'Coming':
        this.props.getUpcoming();
        this.setState({isShow: false})
        break
      default:
        this.props.getNowPlaying();
        break;
    }
  }

  render() {
    const { isReady, movie, isShow, show, videos } = this.state;
    const { search } = this.props.movies;
    console.log(this);

    return (
      <Well className="App">
        {search ==false &&
          <Row style={{ paddingBottom: 20}}>
            <Col xs={1}>
              <ButtonGroup>
                <Button>asdf</Button>
              </ButtonGroup>
            </Col>
            <Col xs={6} xsOffset={2}>
          <ButtonGroup >
            <Button bsStyle={ isShow ? 'primary' : 'default' } onClick={() => this.handleGetMovies('Now')}>Now Showing</Button>
            <Button bsStyle={ isShow ? 'default' : 'primary' } onClick={() => this.handleGetMovies('Coming')}>Coming Soon</Button>
          </ButtonGroup>
          </Col>
          </Row>
        }
        <Row>
          {
            (isReady && this.props.movies.movies.success !== false) && this.props.movies.movies.results.map(movie =>
              <Col style={{ paddingBottom: 80}} xs={12} sm={4} md={3} lg={2} key={movie.id}>
                <Button style={{width:'100%'}} onClick={() => this.handleShow(movie.id)}>
                  <h6>{movie.title}</h6>
                  {movie.poster_path !== null ?
                    <img
                      style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 400,
                        width: '100%',
                      }}
                      src={C.Image_URL + movie.poster_path} alt={movie.title}/>
                      :
                    <h6 style={{
                      height: 390,
                      width:'100%',
                      textAlign:'center',
                    }}> No image found </h6>
                  }
                </Button>
              </Col>
            )
          }
        </Row>
        {(isReady && this.props.movies.movies.total_pages !==1) &&
          <PagesButton isShowing={this.state.isShow}/>
        }
        {(movie !== null) &&
          <Modal show={show} onHide={this.handleClose} bsSize="large">
            <Modal.Header closeButton>
              <Modal.Title style={{textAlign: "center"}}>{movie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={6}>
                  {movie.backdrop_path !== null ?
                    <img
                      style={{
                        height: 400,
                        width: '100%',
                      }}
                      src={C.Image_URL + movie.backdrop_path} alt={movie.title}/>
                    :
                    <h6 style={{
                      height: 400,
                      width:'100%',
                      textAlign:'center',
                    }}> No image found </h6>
                  }
                </Col>
                <Col xs={6}>
                  <h6>Release Date: {movie.release_date}</h6>
                  {movie.genres.length !==0 &&
                    <h6>Genres: {movie.genres.map( data =>
                      data.name
                    ).join(', ')}</h6>
                  }
                  <h6>Rate: {movie.vote_average}/10</h6>
                  {movie.runtime === null ? ('') :
                    <h6>Time: {movie.runtime} mins</h6>
                  }
                  {movie.spoken_languages.length !==0 &&
                    <h6>Languages: {movie.spoken_languages.map(data =>
                      data.name
                    ).join(', ')}</h6>
                  }
                  <h6>Overview: <br/>{movie.overview}</h6>
                  {
                    (videos !== null  && videos.length !== 0) &&
                      <h6>Trials:<br />
                        {videos.map( (v, i) =>
                          <a key={i} href={v}> Video {i+1}</a>
                        )}
                      </h6>
                  }
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        }
      </Well>
    );
  }
}

const mapStateToProps = (state)=>({
  ...state
})

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
