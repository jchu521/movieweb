import C from '../constants';

const movieURL = C.URL + 'movie/';

//GET /movie/now_playing
export const getNowPlayingAPI = (page) => {
  let url = movieURL + 'now_playing?api_key=' + C.API_KEY + '&page='+ page +'&region=au';

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /movie/{movie_id}
export const getMovie = (movieId) => {
  let url = movieURL + movieId + '?api_key=' + C.API_KEY;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /movie/upcoming
export const getUpcomingAPI = () => {
  let url = movieURL + "upcoming?api_key=" + C.API_KEY + '&page=1&region=au';

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /movie/{movie_id}/videos
export const getMovieVideos = (movieId) => {
  let url = movieURL + movieId + "/videos?api_key=" + C.API_KEY;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /movie/latest
export const getLatestMoviesAPI = () => {
  let url = `${movieURL}latest?api_key=${C.API_KEY}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /movie/popular
export const getMostPopularMoviesAPI = () => {
  let url = `${movieURL}popular?api_key=${C.API_KEY}&region=au`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}
