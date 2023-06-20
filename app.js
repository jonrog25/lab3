const DEBUG = true;
// set up the server
const express = require("express");
const logger = require("morgan");
const { query } = require("./db/db_connection");
const db = require("./db/db_connection");
const app = express();
const port = 3036;
//New Lines

app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

app.use( express.urlencoded({ extended: false }) );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the
app.use(express.static(__dirname + "/public"));

// define middleware that logs all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// define a route for the default home page

app.get("/", (req, res) => {
  res.render('index');
});

//start the server



//define a route for the assignment list page

const read_assignments_all_sql = `
    SELECT 
    food_id, food_name, food_amt, food_desc, store.store_name
    FROM food
    JOIN store
        ON food.store_id = store.store_id
    ORDER BY food.food_id DESC
`

app.get("/assignments", (req, res) => {
    
  db.execute(read_assignments_all_sql, (error, results) => {
    if (DEBUG) {
      console.log(error ? error : results);
    }
    if (error) {
      res.status(500).send(error);
    } else {
        let data = {food: results}; // results is still an array, get first (only) element
        res.render('assignments', data); 
    }
  });
  // res.sendFile( __dirname + "/views/assignments.html" );
});

// define a route for the assignment detail page

const read_assignment_detail_sql = `
    SELECT
        food_id, food_name, food_desc, food_amt, store.store_id, store.store_name
    FROM food
    JOIN store
    ON food.store_id = store.store_id
    WHERE food.food_id = ?
`
app.get("/assignments/:id", (req, res, next) => {

  db.execute(read_assignment_detail_sql, [req.params.id], (error, results) => {
    if (DEBUG) {
      console.log(error ? error : results);
    }
    if (error) {
      res.status(500).send(error);
      
    }
    else if (results.length == 0)
        res.status(404).send(`No foods found with id = "${req.params.id}"` ); // NOT FOUND 
    else {
      let data = {food: results[0]}; // results is still an array, get first (only) element
      res.render('detail', data); 
    }

    
  });



});

const delete_assignment_sql = `
  DELETE 
  FROM
    food
  WHERE
    food_id = ?
  `

  app.get("/assignments/:id/delete", ( req, res ) => {
    db.execute(delete_assignment_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/assignments");
        }
    });
});

const create_assignment_sql = `
    INSERT INTO food 
        (food_name, food_amt, food_desc, store_id) 
    VALUES 
        (?, ?, ?, ?);
`
app.post("/assignments", ( req, res ) => {
  db.execute(create_assignment_sql, [req.body.food_name, req.body.food_amt, req.body.food_desc, req.body.store], (error, results) => {
      if (DEBUG)
          console.log(error ? error : results);
      if (error)
          res.status(500).send(error); //Internal Server Error
      else {
          //results.insertId has the primary key (assignmentId) of the newly inserted row.
          res.redirect(`/assignments/${results.insertId}`);
      }
  });
});

const update_assignment_sql = `
    UPDATE
        food
    SET
        food_name = ?,
        food_desc = ?,
        food_amt = ?,
        store_id = ?
    WHERE
        food_id = ?

`

app.post("/assignments/:id", ( req, res ) => {
    db.execute(update_assignment_sql, [req.body.food_name, req.body.food_desc, req.body.food_amt, req.body.store, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/assignments/${req.params.id}`);
        }
    });
});

app.listen(port, () => {
    console.log(`App server listening on ${port}`);
  });
