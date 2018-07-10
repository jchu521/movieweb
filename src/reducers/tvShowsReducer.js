import C from '../constants';

let tv;
let tvTopRatedTV;

export default (state={tvShows:[], tvTopRatedTV:[]}, action) => {
  const { tvShows, query, search } = action;

  switch (action.type) {
    case C.GET_TV_SHOWS:
      if(tvShows.total_results === 0){
        return {tvShows: tvShows, message:'Not Found', tvTopRatedTV}
      }else{
        tv = tvShows;
        return {tvShows: tvShows, message: 'Found', query, search, tvTopRatedTV}
      }
    case C.GET_TOP_RATED_TV_SHOWS:
      tvTopRatedTV = tvShows;
      if(tvShows.total_results === 0){
        return {tvShows: tv, message1:'Not Found', tvTopRatedTV}
      }else{
        tv = tvShows;
        return {tvShows: tv, message1: 'Found', query, search, tvTopRatedTV}
      }
    case C.GET_ON_AIR_TV_SHOWS:
      if(tvShows.total_results === 0){
        return {tvShows: tvShows, message:'Not Found', tvTopRatedTV}
      }else{
        tv = tvShows;
        return {tvShows: tvShows, message: 'Found', query, search, tvTopRatedTV}
      }
    default:
      return state;
  }
}
