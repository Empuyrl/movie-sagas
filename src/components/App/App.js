import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';


//main component, renders the entire app
function App() {
  return (
    <div className="App">
        <header>
           MOVIES! MOVIES! MOVIES!
        </header>
        {/*router allows routing by creating links to various elemnts
        of the application, these are setup as different pages of the app */}
      <Router> 
        <nav>
          <Link className="link" to="/">Movie List</Link>
          <Link className="link" to="/addMovie">Add Movie</Link>
        </nav>
        {/* routes themselves show which infomation is expected at each path.
        here it's a list of movies on the home path, details for info on each movie
        and addMovie to get more movies in the list/database
        all set to exact as that path is the only place we want the respective info*/}
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
