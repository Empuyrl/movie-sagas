import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from '@material-ui/core';

function AddMovie() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [newMovie, setNewMovie] = useState(
        {
            title: '',
            poster: '',
            description: '',
            genre_id: ''
        }
    );
      // on submit of form, movie will be sent to sent to DB 
    // user will be taken to home page where movie will show up
    const handleSubmit = event => {
        event.preventDefault();

        dispatch({
            type: 'ADD_MOVIE',
            payload: newMovie
        });

        history.push('/');
    }
    // on click of cancel user will be taken to home page
    const onCancel = () => {
        history.push('/');
    }

    return (
        // inputs capture user input and save them to newMovie object
        <div>
            <h1>Add Movies Page!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="movie title"
                    onChange={(event) => setNewMovie({...newMovie, title: event.target.value})}
                    value={newMovie.title}
                    required
                />
                <br />
                <input 
                    type="text" 
                    placeholder="movie poster url"
                    onChange={(event) => setNewMovie({...newMovie, poster: event.target.value})}
                    value={newMovie.poster}
                    required
                />
                <br />
                <textarea 
                    name="description" 
                    placeholder="movie description"
                    onChange={(event) => setNewMovie({...newMovie, description: event.target.value})}
                    value={newMovie.description}
                    rows="5" 
                    cols="50"
                    required

                >
                </textarea>
                <br />
                <select 
                    required 
                    name="genres" 
                    onChange={(event) => setNewMovie({...newMovie, genre_id: event.target.value})} 
                    value={newMovie.genre_id}
                >
                    <option selected value=""> -- select an option -- </option>
                    <option value="1" selected>Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">Science Fiction</option>
                    <option value="12">Space-Opera</option>
                    <option value="13">Superhero</option>
                </select>
                <br />
                <Button variant="contained" size="small" color="secondary" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" size="small" type="submit" color="primary">Submit</Button>

            </form>
        </div>
    );
}

export default AddMovie;