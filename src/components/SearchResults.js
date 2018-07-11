import React, { Component } from 'react';
import '../App.css';
import { getMovie, getMovieVideos } from '../utils/moviesAPI';
import { getTVShow, getTVShowVideos } from '../utils/TVShowsAPI';
import { Well, Row, Col, Button, Modal } from 'react-bootstrap';
import C from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class SearchResults extends Component {

  state = {
    isReady: false,
    movie: null,
    tvShow: null,
    movies: null,
    tvShows: null,
    show: false,
    videos: null
  }

  componentDidMount(){
    const { query } = this.props.match.params;
    console.log(query);
    this.props.searchMulti(query);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.searchResults.searchResults.total_results === 0){
      this.setState({isReady: false, isFound: false});
    }else if(nextProps.searchResults.searchResults.total_results > 0){
      this.setState({
        movies: nextProps.searchResults.searchResults.results.filter( m => m.media_type === 'movie'),
        tvShows: nextProps.searchResults.searchResults.results.filter( m => m.media_type === 'tv'),
        isReady: true,
        isFound: true
      });

    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.query !== this.props.match.params.query){
      this.props.searchMulti(this.props.match.params.query);
    }
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

  render() {
    const { isReady, tvShows, movies,tvShow, movie, show, videos, isFound } = this.state;
    console.log(this);
    return (
      <Well className="App" style={{margin:20}}>
        {!isFound && <h2>No Matching Results</h2>}
        {isReady && tvShows.length!==0 && <h6>TV Shows</h6>}
        <Row>
          {
            isReady && tvShows.length!==0 && tvShows.map(t =>
              <Col style={{ paddingBottom: 80}} xs={12} sm={4} md={3} lg={2} key={t.id}>

                <Button style={{width:'100%'}} onClick={() => this.handleShow(t.id, false)} >
                  <h6>{t.original_name}</h6>
                  {t.poster_path !== null ?
                    <img
                      style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 300,
                        width: '100%',
                      }}
                      src={C.Image_URL + t.poster_path} alt={t.original_name}/>
                      :
                    <h6 style={{
                      height: 290,
                      width:'100%',
                      textAlign:'center',
                    }}> No image found </h6>
                  }
                </Button>
              </Col>
            )
          }
        </Row>
        {isReady && movies.length!==0 && <h6>Movies</h6>}
        <Row>
          {
            isReady && movies.length!==0 && movies.map(m =>
              <Col style={{ paddingBottom: 80}} xs={12} sm={4} md={3} lg={2} key={m.id}>

                <Button style={{width:'100%'}} onClick={() => this.handleShow(m.id, true)} >
                  <h6>{m.title}</h6>
                  {m.poster_path !== null ?
                    <img
                      style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 300,
                        width: '100%',
                      }}
                      src={C.Image_URL + m.poster_path} alt={m.title}/>
                      :
                    <h6 style={{
                      height: 290,
                      width:'100%',
                      textAlign:'center',
                    }}> No image found </h6>
                  }
                </Button>
              </Col>
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
