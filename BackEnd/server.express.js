const express = require("express");
let cors = require("cors");
const app = express();
const port = 8080;
const sql = require("mssql");
const sqlConfig = require("./config.js");
console.log("sqlConfig:", sqlConfig);

app.use(cors());
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get request to display all todos
app.get("/todos/all", (req, res) => {
  sql
    .connect(sqlConfig)
    .then(() => {
      // Template Literal Syntax of query will automatically sanitized against sql injection
      // query to the database to display all
      return sql.query`select * from Todos order by id desc`;
    })
    .then((queryResponse) => {
      // send records as a responses
      res.send(queryResponse.recordset);
    })
    .catch((error) => {
      console.error("Error:/todos/all:", error);
    });
});

// post request too add new Todo
app.post("/todos/add", (req, res) => {
  // req.body is getting JSON object with newTodo title and its status
  let newTodo = req.body;
  sql
    .connect(sqlConfig)
    .then(() => {
      // Template Literal Syntax of query will automatically sanitized against sql injection
      // query to the database to add new records
      return sql.query`INSERT INTO Todos (userId,title,completed) VALUES (1,${newTodo.title},${newTodo.completed});SELECT @@IDENTITY AS ID`;
    })
    .then((queryResponse) => {
      // send records as a responses
      res.send({ status: "success", id: queryResponse.recordset[0].ID });
    })
    .catch((error) => {
      console.error("Error:/todos/add:", error);
    });
});

// Put request to update todo
app.put("/todos/update", (req, res) => {
  // req.body is getting JSON object with updatedTodo title and its Id
  let updatedTodo = req.body;
  sql
    .connect(sqlConfig)
    .then(() => {
      // Template Literal Syntax of query will automatically sanitized against sql injection
      // query to the database to update records
      return sql.query`UPDATE Todos SET title=${updatedTodo.title} where id=${updatedTodo.id}`;
    })
    .then((queryResponse) => {
      // send records as a responses
      res.send({ status: "success" });
    })
    .catch((error) => {
      console.error("Error:/todos/update:", error);
    });
});

// To delete Todo
app.delete("/todos/delete", (req, res) => {
  // req.body is getting JSON object with deletedTodo Id
  let deletedId = req.body;
  sql
    .connect(sqlConfig)
    .then(() => {
      // Template Literal Syntax of query will automatically sanitized against sql injection
      // query to the database to delete record
      return sql.query`DELETE from Todos where id=${deletedId.id}`;
    })
    .then((queryResponse) => {
      // send records as a responses
      res.send({ status: "success" });
    })
    .catch((error) => {
      console.error("Error:/todos/delete:", error);
    });
});

// For completed Todo
app.put("/todos/complete", (req, res) => {
  // req.body is getting JSON object with checked or unchecked Todo and its Id
  let checkedTodo = req.body;
  sql
    .connect(sqlConfig)
    .then(() => {
      // Template Literal Syntax of query will automatically sanitized against sql injection
      // query to the database for checked Todos
      return sql.query`UPDATE Todos SET completed=${checkedTodo.completed} where id=${checkedTodo.id}`;
    })
    .then((queryResponse) => {
      // send records as a responses
      res.send({ status: "success" });
    })
    .catch((error) => {
      console.error("Error:/todos/complete:", error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
