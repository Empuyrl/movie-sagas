import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//define custom styles for the components to use
//useStyles is how they are accessed across the form
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

//recieves movie as a prop, which represents a single movie
function MovieItem ({movie}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    // getting specific details for each movie when the poster is clicked
    // takes user to details page
    //uses history to go to the detail page
    const handleClick = () => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: movie.id
        });
        history.push('/details');
    }

    return (
        // displaying title and movie poster for each movie
        //gives the elements on the detail page attributes for displaying
        <div>
            <Paper >
                <Typography variant="h6" gutterBottom>{movie.title}</Typography>
                <img width="200" height="300" onClick={handleClick} src={movie.poster} alt={movie.title}/>
            </Paper>
        </div>
    )
}

export default MovieItem;