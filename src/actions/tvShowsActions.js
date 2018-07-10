import C from '../constants';
import { getMostPopularTVShowsAPI, getTopRatedTVShowsAPI, getOnAirTVShowsAPI, getAiringTodayTVShowsAPI} from '../utils/TVShowsAPI';


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

//GET /tv/on_the_air
export const getOnAirTVShows = (page) => (dispatch) => {
  return getOnAirTVShowsAPI(page).then(data => {
    dispatch({
      type: C.GET_ON_AIR_TV_SHOWS,
      tvShows: data,
      search: false
    })
  })
}

//GET /tv/airing_today
export const getAiringTodayTVShows = (page) => (dispatch) => {
  return getAiringTodayTVShowsAPI(page).then(data => {
    dispatch({
      type: C.GET_TV_SHOWS,
      tvShows: data,
      search: false
    })
  })
}
