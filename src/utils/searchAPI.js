import C from '../constants';

const search_URL = C.URL + 'search/';

//GET /search/movie
export const searchByMovieNameAPI = (movieName, page) => {
  const url = search_URL + 'movie?api_key=' + C.API_KEY + '&query=' + movieName+'&page='+page;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}
