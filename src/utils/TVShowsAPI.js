import C from '../constants';

const tvURL = C.URL + 'tv/';

// GET /tv/popular
export const getMostPopularTVShowsAPI = () =>{
  const url = `${tvURL}popular?api_key=${C.API_KEY}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /tv/{tv_id}
export const getTVShow = (id) =>{
  const url = `${tvURL}${id}?api_key=${C.API_KEY}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /tv/{tv_id}/videos
export const getTVShowVideos = (id) =>{
  const url = `${tvURL}${id}/videos?api_key=${C.API_KEY}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /tv/top_rated
export const getTopRatedTVShowsAPI = () =>{
  const url = `${tvURL}top_rated?api_key=${C.API_KEY}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /tv/on_the_air
export const getOnAirTVShowsAPI = (page) =>{
  const url = `${tvURL}on_the_air?api_key=${C.API_KEY}&page=${page}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}

//GET /tv/airing_today
export const getAiringTodayTVShowsAPI = (page) =>{
  const url = `${tvURL}airing_today?api_key=${C.API_KEY}&page=${page}`;

  return fetch(url, C.headers).then(C.parseResponse).catch(C.logError);
}
