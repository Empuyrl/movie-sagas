import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Details() {
    //access history to handle navigation on the app
    const history = useHistory();
    const dispatch = useDispatch();
    //access the detials from the store
    const movieDetails = useSelector(store => store.movieDetails);

    console.log('movie details,', movieDetails[0]);
//function to return back to the movie list page
    const onGoBack = () => {
        history.push('/');
    }
    return (
        // getting movie details for each movie based on movie id
        // displaying movie title, poster, genres, and description
        <div>
            <Typography variant="h4" gutterBottom>Details Page</Typography>
            <div>
                 {/* Map over the movieDetails array and render details for each movie 
                 specifying detials of the image size, then displays the asked for info
                 in paragraph tags, join allows for multiple genres to be targeted
                 while description handles the details of the movie*/}
                 {movieDetails.map(details => (
                      <div key={details.id}>
                        <h3>{details.title}</h3>
                        <img width="200" height="300" src={details.poster} alt={details.title}/>
                        <p>Genres: {details.genres.join(', ')}</p>
                        <p>Description: {details.description}</p>
                    </div>
                )) }
            </div>
             {/* Button to navigate back to the movie list page */}
            <button onClick={onGoBack}>Back To List</button>
        </div>
    );
}

export default Details;