import React, { Component } from 'react';
import '../App.css';
import { getNowPlaying, getMovie, getUpcoming, getMovieVideos } from '../utils/moviesAPI';
import { Well, Row, Col, Button, Modal, ButtonGroup } from 'react-bootstrap';
import C from '../constants';

class CurrentOrUpcmoingMovies extends Component {

  state = {
    isReady: false,
    show:false,
    movies: null,
    movie: null,
    genres: null,
    isShow: true,
    videos: null,
  }

  componentDidMount(){
    getNowPlaying().then( (data) =>
      this.setState({
        movies: data,
        isReady: true
      })
    );
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
        getNowPlaying().then( (data) =>
          this.setState({
            movies: data,
            isReady: true,
            isShow: true,
          })
        );
        break;
      case 'Coming':
        getUpcoming().then( (data) =>
          this.setState({
            movies: data,
            isReady: true,
            isShow: false,
          })
        );
        break
      default:
        getNowPlaying().then( (data) =>
          this.setState({
            movies: data,
            isReady: true,
            isShow: true,
          })
        );
        break;
    }
  }

  render() {
    const { isReady, movie, isShow, show, videos } = this.state;
    console.log(this.state);

    return (
      <Well className="App">
        <ButtonGroup style={{ paddingBottom: 20}}>
          <Button bsStyle={ isShow ? 'primary' : 'default' } onClick={() => this.handleGetMovies('Now')}>Now Showing</Button>
          <Button bsStyle={ isShow ? 'default' : 'primary' } onClick={() => this.handleGetMovies('Coming')}>Coming Soon</Button>
        </ButtonGroup>
        <Row>
          {
            (isReady) && this.state.movies.results.map(movie =>
              <Col style={{ paddingBottom: 80}} xs={12} sm={4} md={3} key={movie.id}>
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
                  <h6>Genres: {movie.genres.map( data =>
                    data.name
                  ).join(', ')}</h6>
                  <h6>Rate: {movie.vote_average}/10</h6>
                  <h6>Time: {movie.runtime} mins</h6>
                  <h6>Languages: {movie.spoken_languages.map(data =>
                    data.name
                  ).join(', ')}</h6>
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

export default CurrentOrUpcmoingMovies;
