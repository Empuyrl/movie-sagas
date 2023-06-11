import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Details() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.movieDetails);

    console.log('movie details,', movieDetails[0]);

    const onGoBack = () => {
        history.push('/');
    }
    return (
        // getting movie details for each movie based on movie id
        // displaying movie title, poster, genres, and description
        <div>
            <Typography variant="h4" gutterBottom>Details Page</Typography>
            <div>
                 {movieDetails.map(details => (
                      <div key={details.id}>
                        <h3>{details.title}</h3>
                        <img width="200" height="300" src={details.poster} alt={details.title}/>
                        <p>Genres: {details.genres.join(', ')}</p>
                        <p>Description: {details.description}</p>
                    </div>
                )) }
            </div>
            <button onClick={onGoBack}>Back To List</button>
        </div>
    );
}

export default Details;