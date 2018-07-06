import C from '../constants';


export default (state={movies:[]}, action) => {
  const { movies } = action;

  switch (action.type) {
    case C.SEARCH_MOVIE_BY_NAME:
      return {movies: movies}
    default:
      return state;
  }
}
