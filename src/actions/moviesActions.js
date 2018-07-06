import { searchByMovieNameAPI } from '../utils/searchAPI';
import C from '../constants';

//Search movies
//GET /search/movie by name
export const searchByMovieName = (query) => (dispatch) => {
  return searchByMovieNameAPI(query).then( movies => {
    dispatch({
      type: C.SEARCH_MOVIE_BY_NAME,
      movies: movies.results,
    })
  }).catch(C.logError);
}
