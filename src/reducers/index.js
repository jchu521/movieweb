import { combineReducers } from 'redux';
import moviesReducers from './moviesReducers';
import tvShowsReducer from './tvShowsReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  movies: moviesReducers,
  tvShows: tvShowsReducer,
  searchResults: searchReducer,
})
