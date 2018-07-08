import C from '../constants';


export default (state={tvShows:[]}, action) => {
  const { tvShows, query, search } = action;

  switch (action.type) {
    case C.GET_TV_SHOWS:
      if(tvShows.total_results === 0){
        return {tvShows: tvShows, message:'Not Found'}
      }else{
        return {tvShows: tvShows, message: 'Found', query, search}
      }
    default:
      return state;
  }
}
