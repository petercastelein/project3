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
const port = process.env.PORT || 3030;
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
      //console.log(req.body);
      const { description } = req.body;
      const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
      );

      res.json(newTodo);
   } catch (err) {
      console.log(err.message);
   }
})

//String sqlStatement = "INSERT INTO teammembers(student_name, section, favorite_movie, favorite_holiday) VALUES ('Balone', 666, 'Home Alone', '12/25/99');"; 
// {order_id: 1, purchase_date: '2021-09-22T05:00:00.000Z', employee_id: 9, inventory_id_array: Array(4), total_price: '15.75'}
// order_id | purchase_date | employee_id | inventory_id_array |    total_price 
// body format {"purchase_date": "12/2/22", "employee_id": 1, "inventory_id_array": [1,2,3], "total_price": "15.75"}
app.post("/order", async(req, res) => {
   //console.log(req.body);
   //console.log(req.body.purchase_date);
   const purchase_date = req.body.purchase_date;
   const employee_id = req.body.employee_id;
   const inventory_id_array = req.body.inventory_id_array;
   const total_price = req.body.total_price;

   try {
      const newOrder = await pool.query("INSERT INTO customer_order (order_id, purchase_date, employee_id, inventory_id_array, total_price) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *",
      [purchase_date, employee_id, inventory_id_array, total_price]
      );
      
      //const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
      //[description, id]);
      for (const idx in inventory_id_array) {
         //console.log(inventory_id_array[idx]);
         const updateInven = await pool.query("UPDATE inventory SET inventory_quantity = inventory_quantity - 1 WHERE inventory_id = $1 AND inventory_quantity > 0 RETURNING *",
         [inventory_id_array[idx]]);
         //console.log(updateInven);
      }
      res.json(newOrder);
   } catch (err) {
      console.log(err.message);
   }
})

// new inventory
// inventory_id | inventory_name | inventory_quantity | price_per_quantity | is_menu_item | is_linked | linked_name 
app.post("/newInventory", async(req, res)  => {
   try {
      //console.log(req.body);
      const inventory_name = req.body.inventory_name;
      const inventory_quantity = req.body.inventory_quantity;
      const price_per_quantity = req.body.price_per_quantity;
      const is_menu_item = req.body.is_menu_item;
      const newInventory = await pool.query("INSERT INTO inventory (inventory_id, inventory_name, inventory_quantity, price_per_quantity, is_menu_item) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *",
      [inventory_name, inventory_quantity, price_per_quantity, is_menu_item]);

      res.json(newInventory);
   } catch (err) {
      console.log(err.message);
   }
})

// update inventory
// inventory_id | inventory_name | inventory_quantity | price_per_quantity | is_menu_item | is_linked | linked_name 
app.put("/updateInventory", async(req, res)  => {
   try {
      //console.log(req.body);
      const inventory_id = req.body.inventory_id;
      const inventory_name = req.body.inventory_name;
      const inventory_quantity = req.body.inventory_quantity;
      const price_per_quantity = req.body.price_per_quantity;
      const updateInventory = await pool.query("UPDATE inventory SET inventory_name = $1, inventory_quantity = $2, price_per_quantity = $3 WHERE inventory_id = $4",
      [inventory_name, inventory_quantity, price_per_quantity, inventory_id]);

      res.json(updateInventory);
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
      //const allTodos = await pool.query("SELECT * FROM customer_order WHERE employee_id = 9");
      const allTodos = await pool.query("SELECT * FROM inventory WHERE is_menu_item = 't'");
      //console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

app.get("/getInventory", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM inventory");
      //console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

app.get("/getEmployees", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM employee");
      //console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

app.get("/getOrders", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM customer_order");
      //console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

// function to get most recent date
app.get("/getRecentDate", async(req, res) => {
   try {
      const allTodos = await pool.query("SELECT purchase_date FROM customer_order WHERE purchase_date = (SELECT MIN(purchase_date) FROM customer_order);");
      //console.log(allTodos.rows);
      res.json(allTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
})

//get a todo

app.get("/todos/:id", async(req, res) => {
   try {
      //console.log(req.params);
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
      //console.log(req.params);
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
      //console.log(req.params);
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