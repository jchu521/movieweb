import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { connectRouter } from 'connected-react-router';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';

const history = createBrowserHistory();

const middleware = applyMiddleware(thunk);

let store = createStore(
  connectRouter(history)(reducers),
   middleware
);

export default store;
