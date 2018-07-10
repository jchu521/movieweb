import C from '../constants';
import { searchMultiAPI } from '../utils/searchAPI';

//GET /search/multi
export const searchMulti = (query, page) => (dispatch) => {
  return searchMultiAPI(query, page).then( data => {
    dispatch({
      type: C.GET_SEARCH_RESULTS,
      searchResults: data
    })
  })
}
