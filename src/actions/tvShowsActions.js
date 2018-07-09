import C from '../constants';
import { getMostPopularTVShowsAPI, getTopRatedTVShowsAPI} from '../utils/TVShowsAPI';


// GET /tv/popular
export const getMostPopularTVShows = () => (dispatch) => {
  return getMostPopularTVShowsAPI().then(data => {
    dispatch({
      type: C.GET_TV_SHOWS,
      tvShows: data,
      search: false
    })
  })
}

//GET /tv/top_rated
export const getTopRatedTVShows = () => (dispatch) => {
  return getTopRatedTVShowsAPI().then(data => {
    dispatch({
      type: C.GET_TOP_RATED_TV_SHOWS,
      tvShows: data,
      search: false
    })
  })
}
