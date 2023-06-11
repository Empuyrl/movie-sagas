import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
        <header>
           MOVIES! MOVIES! MOVIES!
        </header>
      <Router> 
        <nav>
          <Link className="link" to="/">Movie List</Link>
          <Link className="link" to="/addMovie">Add Movie</Link>
        </nav>
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path="/details" exact>
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route path="/addMovie" exact>
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
