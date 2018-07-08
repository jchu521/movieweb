import C from '../constants';
import { getMostPopularTVShowsAPI } from '../utils/TVShowsAPI';


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
