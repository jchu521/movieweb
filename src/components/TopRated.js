import React, { Component } from 'react';
import '../App.css';
import { getMovie, getMovieVideos } from '../utils/moviesAPI';
import { getTVShow, getTVShowVideos } from '../utils/TVShowsAPI';
import { Well, Row, Col, Button, Modal, Carousel } from 'react-bootstrap';
import C from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class TopRated extends Component {

  state = {
    isTVReady: false,
    isMoviesReady: false,
    tvShow: null,
    movie: null,
    isShow: true,
    videos: null,
  }

  componentDidMount(){
    this.props.getTopRatedTVShows();
    this.props.getTopRatedMovies();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({isXsScreen: window.innerWidth < 768 });
  }

  handleShow = (id, isMovies) => {
    if(isMovies){
      getMovie(id).then((data) =>
        this.setState({
          movie: data,
        })
      ).then( () =>
        getMovieVideos(id).then( (d) =>
          this.setState({
            videos: d.results.map(v => C.Youtube_URL + v.key),
            show: true,
          })
        )
      )
    }else{
      getTVShow(id).then((data) =>
        this.setState({
          tvShow: data,
        })
      ).then( () =>
        getTVShowVideos(id).then( (d) =>
          this.setState({
            videos: d.results.map(v => C.Youtube_URL + v.key),
            show: true,
          })
        )
      )
    }

  }
  
  handleClose = () => {
    this.setState({
      tvShow: null,
      movie:null,
      show: false,
      videos: null
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tvShows.message1 === 'Not Found'){
      this.setState({isTVReady: false})
    }else if(nextProps.tvShows.message1 === 'Found'){
      this.setState({
        isTVReady: true,
        tvShows1: nextProps.tvShows.tvTopRatedTV.results.slice(0,5),
        tvShows2: nextProps.tvShows.tvTopRatedTV.results.slice(5,10),
        tvShows3: nextProps.tvShows.tvTopRatedTV.results.slice(10,15)
      })
    }

    if(nextProps.movies.topRatedMovies.total_results === 0){
      this.setState({isMoviesReady: false})
    }else if(nextProps.movies.topRatedMovies.total_results !== 0){
      this.setState({
        isMoviesReady: true,
        movies1: nextProps.movies.topRatedMovies.results.slice(0,5),
        movies2: nextProps.movies.topRatedMovies.results.slice(5,10),
        movies3: nextProps.movies.topRatedMovies.results.slice(10,15)
      })
    }
  }

  render() {
    const { isTVReady, isMoviesReady, isXsScreen, tvShow, show, videos, movie } = this.state;
    const { tvShows, movies } = this.props;
    // console.log(this);
    return (
      <Well className="App" style={{margin:20}}>
        <h3>Top Rate</h3>
        <h6>TV Shows</h6>
        <Row>
            {isXsScreen ?
              (
                <Carousel interval={10000}>
                  {  isTVReady &&  tvShows.tvTopRatedTV.results.map( (tvShow,i) =>
                    <Carousel.Item key={tvShow.id}>
                    <Col  >
                      <Button style={{width:'100%'}} onClick={() => this.handleShow(tvShow.id, false)} >
                        <h6>{tvShow.original_name}</h6>
                        {tvShow.poster_path !== null ?
                          <img
                            style={{
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: 300,
                              width: '100%',
                            }}
                            src={C.Image_URL + tvShow.poster_path} alt={tvShow.title}/>
                            :
                          <h6 style={{
                            height: 290,
                            width:'100%',
                            textAlign:'center',
                          }}> No image found </h6>
                        }
                      </Button>
                    </Col>
                    </Carousel.Item>
                  )
                }
              </Carousel>
            ):
              (
                <Carousel  interval={10000}>
                  <Carousel.Item >
                  {  isTVReady  && this.state.tvShows1.map( (tvShow,i) =>
                    <Col xsOffset={2} key={tvShow.id}>
                      <Col style={{padding:10}} xs={12} sm={4} lg={2} >
                        <Button style={{width:'100%'}} onClick={() => this.handleShow(tvShow.id, false)} >
                          <h6>{tvShow.original_name}</h6>
                          {tvShow.poster_path !== null ?
                            <img
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 300,
                                width: '100%',
                              }}
                              src={C.Image_URL + tvShow.poster_path} alt={tvShow.title}/>
                              :
                            <h6 style={{
                              height: 290,
                              width:'100%',
                              textAlign:'center',
                            }}> No image found </h6>
                          }
                        </Button>
                      </Col>
                    </Col>

                  )}
                </Carousel.Item>
                <Carousel.Item >
                  {  isTVReady && this.state.tvShows2.map( (tvShow,i) =>
                    <Col xsOffset={2} key={tvShow.id}>
                      <Col style={{padding:10}}  xs={12} sm={4} lg={2} >
                        <Button style={{width:'100%'}} onClick={() => this.handleShow(tvShow.id, false)} >
                          <h6>{tvShow.original_name}</h6>
                          {tvShow.poster_path !== null ?
                            <img
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 300,
                                width: '100%',
                              }}
                              src={C.Image_URL + tvShow.poster_path} alt={tvShow.title}/>
                              :
                            <h6 style={{
                              height: 290,
                              width:'100%',
                              textAlign:'center',
                            }}> No image found </h6>
                          }
                        </Button>
                      </Col>
                    </Col>
                  )}
                </Carousel.Item>
                <Carousel.Item >
                  {  isTVReady && this.state.tvShows3.map( (tvShow,i) =>
                    <Col xsOffset={2} key={tvShow.id}>
                      <Col style={{padding:10}}  xs={12} sm={4} lg={2} >
                        <Button style={{width:'100%'}} onClick={() => this.handleShow(tvShow.id, false)} >
                          <h6>{tvShow.original_name}</h6>
                          {tvShow.poster_path !== null ?
                            <img
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 300,
                                width: '100%',
                              }}
                              src={C.Image_URL + tvShow.poster_path} alt={tvShow.title}/>
                              :
                            <h6 style={{
                              height: 290,
                              width:'100%',
                              textAlign:'center',
                            }}> No image found </h6>
                          }
                        </Button>
                      </Col>
                    </Col>
                  )}
                </Carousel.Item>
              </Carousel>)
            }
        </Row>
        <h6>Movies</h6>
        <Row>
            {isXsScreen ?
              (
                <Carousel interval={10000}>
                  {  isMoviesReady &&  movies.topRatedMovies.results.map( (movie,i) =>
                    <Carousel.Item key={movie.id}>
                    <Col  style={{padding:10}}>
                      <Button style={{width:'100%'}} onClick={() => this.handleShow(movie.id, true)} >
                        <h6>{movie.title}</h6>
                        {movie.poster_path !== null ?
                          <img
                            style={{
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: 300,
                              width: '100%',
                            }}
                            src={C.Image_URL + movie.poster_path} alt={movie.title}/>
                            :
                          <h6 style={{
                            height: 290,
                            width:'100%',
                            textAlign:'center',
                          }}> No image found </h6>
                        }
                      </Button>
                    </Col>
                    </Carousel.Item>
                  )
                }
              </Carousel>
            ):
              (
                <Carousel  interval={10000}>
                  <Carousel.Item >
                  {  isMoviesReady  && this.state.movies1.map( (movie,i) =>
                    <Col xsOffset={2} key={movie.id}>
                      <Col  style={{padding:10}}  xs={12} sm={4} lg={2}>
                        <Button style={{width:'100%'}} onClick={() => this.handleShow(movie.id, true)} >
                          <h6>{movie.title}</h6>
                          {movie.poster_path !== null ?
                            <img
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 300,
                                width: '100%',
                              }}
                              src={C.Image_URL + movie.poster_path} alt={movie.title}/>
                              :
                            <h6 style={{
                              height: 290,
                              width:'100%',
                              textAlign:'center',
                            }}> No image found </h6>
                          }
                        </Button>
                      </Col>
                    </Col>
                  )}
                </Carousel.Item>
                <Carousel.Item >
                  {  isMoviesReady && this.state.movies2.map( (movie,i) =>
                    <Col xsOffset={2} key={movie.id}>
                      <Col  style={{padding:10}}  xs={12} sm={4} lg={2}>
                        <Button style={{width:'100%'}} onClick={() => this.handleShow(movie.id, true)} >
                          <h6>{movie.title}</h6>
                          {movie.poster_path !== null ?
                            <img
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 300,
                                width: '100%',
                              }}
                              src={C.Image_URL + movie.poster_path} alt={movie.title}/>
                              :
                            <h6 style={{
                              height: 290,
                              width:'100%',
                              textAlign:'center',
                            }}> No image found </h6>
                          }
                        </Button>
                      </Col>
                    </Col>
                  )}
                </Carousel.Item>
                <Carousel.Item >
                  {  isMoviesReady && this.state.movies3.map( (movie,i) =>
                    <Col xsOffset={2} key={movie.id}>
                      <Col  style={{padding:10}}  xs={12} sm={4} lg={2}>
                        <Button style={{width:'100%'}} onClick={() => this.handleShow(movie.id, true)} >
                          <h6>{movie.title}</h6>
                          {movie.poster_path !== null ?
                            <img
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 300,
                                width: '100%',
                              }}
                              src={C.Image_URL + movie.poster_path} alt={movie.title}/>
                              :
                            <h6 style={{
                              height: 290,
                              width:'100%',
                              textAlign:'center',
                            }}> No image found </h6>
                          }
                        </Button>
                      </Col>
                    </Col>
                  )}
                </Carousel.Item>
              </Carousel>)
            }
        </Row>

        {(tvShow !== null) &&
          <Modal show={show} onHide={this.handleClose} bsSize="large">
            <Modal.Header closeButton>
              <Modal.Title style={{textAlign: "center"}}>{tvShow.original_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={6}>
                  {tvShow.backdrop_path !== null ?
                    <img
                      style={{
                        height: 400,
                        width: '100%',
                      }}
                      src={C.Image_URL + tvShow.backdrop_path} alt={tvShow.title}/>
                    :
                    <h6 style={{
                      height: 400,
                      width:'100%',
                      textAlign:'center',
                    }}> No image found </h6>
                  }
                </Col>
                <Col xs={6}>
                  <h6>Number of seasons: {tvShow.number_of_seasons}</h6>
                  {tvShow.genres.length !==0 &&
                    <h6>Genres: {tvShow.genres.map( data =>
                      data.name
                    ).join(', ')}</h6>
                  }
                  <h6>Rate: {tvShow.vote_average}/10</h6>
                  <h6>Overview: <br/>{tvShow.overview}</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
