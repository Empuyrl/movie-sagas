import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieSpecs from '../MovieSpecs/MovieSpecs';

// Material UI imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // load movies on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        // Maping through the movie reducer from index to display each movie
        <Container>
            <Typography variant="h4" gutterBottom>Movie List</Typography>
            <Grid container spacing={5} className="movies">
                {movies.map(movie => (
                    // implemented grid to make page responsive
                    <Grid 
                        item xs={12} md={4} lg={3} 
                        key={movie.id} 
                    >
                        <MovieSpecs movie={movie}/>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
}
export default MovieList;