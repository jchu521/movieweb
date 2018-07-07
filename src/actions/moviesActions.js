import { searchByMovieNameAPI } from '../utils/searchAPI';
import { getNowPlayingAPI, getUpcomingAPI } from '../utils/moviesAPI';

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
