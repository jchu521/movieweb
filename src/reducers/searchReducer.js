import C from '../constants';

export default (state={searchResults:[]}, action) =>{
  const { searchResults } = action;

  switch (action.type) {
    case C.GET_SEARCH_RESULTS:
      return {searchResults: searchResults}

  }
  return state;
}
