//combines reducers into a single root reducer to call
import { combineReducers } from "redux";

// Used to store movies returned from the server
//after dispatch, it updates the state with the new payload
//state begins as an empty array
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
//same pattern as the moives, but for genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

//stoes the data for specific movies
//same pattern, just for a single point of info at once
const movieDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

//where all of the reducers are combined into the root for easy calling
const _rootReducer = combineReducers({movies, genres, movieDetails });

export default _rootReducer;