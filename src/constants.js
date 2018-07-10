const  API_VERSION = 3;
const constants = {
  headers:
  {
    "Content-Type": "application/json",
    "Authorization": 'whatever-you-want',
  },

  GET_MOVIES: 'GET_MOVIES',
  GET_LATEST_MOVIES: 'GET_LATEST_MOVIES',
  GET_TOP_RATED_MOVIES: 'GET_TOP_RATED_MOVIES',

  GET_TV_SHOWS:'GET_TV_SHOWS',
  GET_TOP_RATED_TV_SHOWS: 'GET_TOP_RATED_TV_SHOWS',
  GET_ON_AIR_TV_SHOWS:'GET_ON_AIR_TV_SHOWS',

  GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
  
  API_KEY: '149303c5a88a0b233820a85576006085',
  URL: `https://api.themoviedb.org/${API_VERSION}/`,
  Image_URL: 'https://image.tmdb.org/t/p/original',
  Youtube_URL: 'https://www.youtube.com/watch?v=',

  parseResponse: response => response.json(),
  logError: error => console.log(error),

}

export default constants;
