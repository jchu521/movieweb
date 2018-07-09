import { searchByMovieNameAPI } from '../utils/searchAPI';
import {
  getTopRatedMoviesAPI,
  getNowPlayingAPI,
  getUpcomingAPI,
  getLatestMoviesAPI,
  getMostPopularMoviesAPI
} from '../utils/moviesAPI';

import C from '../constants';

//Search movies
//GET /search/movie by name
export const searchByMovieName = (query, page) => (dispatch) => {
  return searchByMovieNameAPI(query, page).then( movies => {
    dispatch({
      type: C.GET_MOVIES,
      movies: movies,
      query,
      search: true,
    })
  }).catch(C.logError);
}


//GET /movie/now_playing
export const getNowPlaying = (page) => (dispatch) => {
  return getNowPlayingAPI(page).then( movies => {
    dispatch({
      type: C.GET_MOVIES,
      movies: movies,
      search: false,
    })
  }).catch(C.logError);
}

//GET /movie/upcoming
export const getUpcoming = (page) => (dispatch) => {
  return getUpcomingAPI(page).then( movies => {
    dispatch({
      type: C.GET_MOVIES,
      movies: movies,
      search: false,
    })
  }).catch(C.logError);
}

//GET /movie/latest
export const getLatestMovies = () => (dispatch) => {
  return getLatestMoviesAPI().then( data => {
    dispatch({
      type: C.GET_LATEST_MOVIES,
      movies: data,
      search: false
    })
  });
}

//GET /movie/popular
export const getMostPopularMovies = () => (dispatch) => {
  return getMostPopularMoviesAPI().then( data => {
    dispatch({
      type: C.GET_MOVIES,
      movies: data,
      search: false
    })
  });
}

//GET /movie/top_rated
export const getTopRatedMovies = () => (dispatch) =>{
  return getTopRatedMoviesAPI().then( data => {
    dispatch({
      type: C.GET_TOP_RATED_MOVIES,
      movies: data,
      search: false
    })
  });
}
