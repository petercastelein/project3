/*
CSCE 315
Project 3
Team 14
11/08/22
 */

// index.js
// node - express API for database access

const express = require("express");
const app = express();
const port = 5800;
const cors = require("cors");
const pool = require("./db.js");

//middleware
app.use(cors());
app.use(express.json()); //req.body

// Add process hook to shutdown pool
process.on('SIGINT', function() {
   pool.end();
   console.log('Application successfully shutdown');
   process.exit(0);
});

//ROUTES//

//creat a todo

app.post("/todos", async(req, res) => {
   try {
      console.log(req.body);
      const { description } = req.body;
      const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
      );

      res.json(newTodo);
   } catch (err) {
      console.log(err.message);
   }
})

app.post("/order", async(req, res) => {
   try {
      console.log(req.body);
      const { order } = req.body;
      const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [order]
      );

      res.json(newTodo);
   } catch (err) {
      console.log(err.message);
   }
})

//get all todos

app.get("/todos", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM todo");

      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

app.get("/menu", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM customer_order WHERE employee_id = 9");
      //const allTodos = await pool.query("SELECT * FROM inventory WHERE is_menu_item = 't'");
      console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

app.get("/getInventory", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM inventory");
      console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

//get a todo

app.get("/todos/:id", async(req, res) => {
   try {
      console.log(req.params);
      const { id } = req.params;
      const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

      res.json(getTodo.rows[0]);
   } catch (err) {
      console.log(err.message);
   }
})

//update a todo
app.put("/todos/:id", async(req, res) => {
   try {
      console.log(req.params);
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]);


      res.json(updateTodo);
   } catch (err) {
      console.log(err.message);
   }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
   try {
      console.log(req.params);
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
      [id]);

      res.json(deleteTodo);
   } catch (err) {
      console.log(err.message);
   }
});

app.get('/user', (req, res) => {
   teammembers = []
   pool
       .query('SELECT * FROM teammembers;')
       .then(query_res => {
           for (let i = 0; i < query_res.rowCount; i++){
               teammembers.push(query_res.rows[i]);
           }
           const data = {teammembers: teammembers};
           console.log(teammembers);
       });
});

app.listen(port, () => {
   console.log(`Server is listening at http://localhost:${port}`);
});