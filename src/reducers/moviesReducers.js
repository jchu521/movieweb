import C from '../constants';


export default (state={movies:[]}, action) => {
  const { movies, query, search } = action;

  switch (action.type) {
    case C.GET_MOVIES:
    console.log(movies);
      if(movies.total_results === 0){
        return {movies: movies, message:'Not Found'}
      }else{
        return {movies: movies, message: 'Found', query, search}
      }
    default:
      return state;
  }
}
