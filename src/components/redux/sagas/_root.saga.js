import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



// Create the rootSaga generator function
export default function* _rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('ADD_MOVIE' , addMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchDetails(action) {
    // gets specific movie clicked details based on id
    try {
        const details = yield axios.get(`/api/movie/${action.payload}`);
        console.log('get details', details.data);
        yield put({
            type: 'SET_DETAILS',
            payload: details.data
        });
    } catch {
        console.log('get details error');
    }
}

function* addMovie(action) {
    // posts movie to database
    yield axios.post('/api/movie', action.payload);
    // gets movie details include added movie
    yield put({
        type: 'FETCH_MOVIES'
    });

}

