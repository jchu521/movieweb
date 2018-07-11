import React, { Component } from 'react';
import '../App.css';
import { getTVShow, getTVShowVideos } from '../utils/TVShowsAPI';
import PagesButton from '../utils/pagesButton';
import { Well, Row, Col, Button, Modal, ButtonGroup } from 'react-bootstrap';
import C from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class TVShowsList extends Component {

  state = {
    isReady: false,
    show:false,
    tvShow: null,
    genres: null,
    isShow: true,
    videos: null,
  }

  componentDidMount(){
    this.props.getOnAirTVShows();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tvShows.message ==='Not Found'){
      this.setState({isReady: false})
    }else if(nextProps.tvShows.message ==='Found'){
      this.setState({isReady: true})
    }
  }

  handleClose = () => {
    this.setState({
      tvShow: null,
      show: false,
      videos: null
    });
  }

  handleShow = (id) => {
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

  handleGetMovies = (type) => {
    switch (type) {
      case 'Now':
        this.props.getOnAirTVShows();
        this.setState({isShow: true, isReady: false})
        break;
      case 'Coming':
        this.props.getAiringTodayTVShows();
        this.setState({isShow: false, isReady: false})
        break
      default:
        this.props.getOnAirTVShows();
        break;
    }
  }

  render() {
    const { isReady, tvShow, isShow, show, videos } = this.state;
    const { tvShows } = this.props.tvShows;
    console.log(this);
    return (
      <Well className="App" style={{margin:20}}>
          <Row style={{ paddingBottom: 20}}>
            <Col xs={1}>
              <ButtonGroup>
                <Button>Sort By</Button>
              </ButtonGroup>
            </Col>
            <Col xs={6} xsOffset={2}>
          <ButtonGroup >
            <Button bsStyle={ isShow ? 'primary' : 'default' } onClick={() => this.handleGetMovies('Now')}>On Air</Button>
            <Button bsStyle={ isShow ? 'default' : 'primary' } onClick={() => this.handleGetMovies('Coming')}>New</Button>
          </ButtonGroup>
          </Col>
          </Row>

        <Row>
          {
            (isReady && tvShows.success !== false) && tvShows.results.map(tvShow =>
              <Col style={{ paddingBottom: 80}} xs={12} sm={4} md={3} lg={2} key={tvShow.id}>
                <Button style={{width:'100%'}} onClick={() => this.handleShow(tvShow.id)}>
                  <h6>{tvShow.name}</h6>
                  {tvShow.poster_path !== null ?
                    <img
                      style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 300,
                        width: '100%',
                      }}
                      src={C.Image_URL + tvShow.poster_path} alt={tvShow.name}/>
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
        {(isReady && tvShows.total_pages !==1) &&
          <PagesButton isShowing={this.state.isShow} isMovies={false}/>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(TVShowsList);
