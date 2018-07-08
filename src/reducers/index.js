import { combineReducers } from 'redux';
import moviesReducers from './moviesReducers';
import tvShowsReducer from './tvShowsReducer';

export default combineReducers({
  movies: moviesReducers,
  tvShows: tvShowsReducer,
})
