const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//route GETS all movies
router.get('/', (req, res) => {
//selects all the movies and orders them by title
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  //where the connection to the database is made
  pool.query(query)
    .then( result => {
      //sends the movie data as a respond
      res.send(result.rows);
    })
    //error if data isn't recieved
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

//route for getting details of a specific moive
router.get('/:movieid', (req, res) => {
  //gets the id of the movie based on the parameters
  let id = req.params.movieid;
  console.log('id is ', id);
  //query to select movie details and associated info
  //array_agg takes the info in as an array, so [id, title, poster, desciption]
  //and returns the info set as values of the element asked
  //sql key words for making a JOIN statement throuugh junction tables
  const selectQuery = `
      SELECT
        movies.id,
        movies.title,
        movies.poster,
        movies.description,
        array_agg(genres.name) as genres
      FROM movies
      JOIN movies_genres
        ON movies.id = movies_genres.movie_id
      JOIN genres
        ON movies_genres.genre_id = genres.id
      WHERE movies.id = $1
      GROUP BY movies.id, movies.title, movies.poster, movies.description;
    `;
    pool.query(selectQuery, [id])
    .then(results => {
      console.log('results, ', results);
      res.send(results.rows);
    })
    .catch(err => {
      console.log('get movie details err', err);
      res.sendStatus(500);
    })
});

//route for creating a new movie
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  //puts the new movie in the "movies" table
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    //gets the id of the newly created movie
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      //sets the genre for the new movie
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;