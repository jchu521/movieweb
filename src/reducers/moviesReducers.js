import C from '../constants';


let m;
let topRatedMovies;

export default (state={movies:[], latestMovies:null, topRatedMovies:[] }, action) => {
  const { movies, query, search } = action;

  switch (action.type) {
    case C.GET_MOVIES:
      if(movies.total_results === 0){
        return {movies: movies, message:'Not Found', topRatedMovies}
      }else{
        m = movies;
        return {movies: movies, message: 'Found', query, search, topRatedMovies}
      }
    case C.GET_LATEST_MOVIES:
      return { movies:m, latestMovies: movies }
    case C.GET_TOP_RATED_MOVIES:
      topRatedMovies = movies;
      return {movies: m, topRatedMovies: movies}
    default:
      return state;
  }
}
