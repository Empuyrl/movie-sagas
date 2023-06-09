//imports everything needed in order to run the project
//store, middleware, logger for problems
//all of the reducers and sagas
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import _rootReducer from './components/redux/reducers/_root.reducer';
import _rootSaga from './components/redux/sagas/_root.saga';

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    // Add sagaMiddleware to our store
    //Add all reducers and the logger as well
    _rootReducer,
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
//allows the sagas to listen and response to dispatches
sagaMiddleware.run(_rootSaga);

//mounts everything to the root
//provider wraps the store to allow use of redux in the store
ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
