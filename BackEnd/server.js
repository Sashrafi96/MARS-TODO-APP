const http = require("http");
const { stringify } = require("querystring");

let todosdata = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
];

const requestListener = function (req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  res.setHeader("Content-Type", "application/json");

  if (req.method == "OPTIONS") {
    res.end("1");
  }
  // GET request todo/all route
  else if (req.url == "/todos/all" && req.method == "GET") {
    let myOutput = JSON.stringify(todosdata);
    res.end(myOutput);
  } // POST request /todo/add route
  else if (req.url == "/todos/add" && req.method == "POST") {
    let newId = new Date().getTime();
    // Adding New Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let addToDo = JSON.parse(body);
      let newToDo = {
        id: newId,
        title: addToDo.title,
        completed: addToDo.completed,
      };
      // update database -- Adding new data
      todosdata.unshift(newToDo);
    });
    res.end(JSON.stringify({ status: "success", id: newId }));
  } else if (req.url == "/todos/update" && req.method == "PUT") {
    //updating Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let updatedToDo = JSON.parse(body);
      // updating existed array
      let index = todosdata.findIndex((x) => x.id === updatedToDo.id);
      todosdata[index].title = updatedToDo.title;
      res.end(JSON.stringify({ status: "success" }));
    });
  } else if (req.url == "/todos/delete" && req.method == "DELETE") {
    //Deleting Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let deletedToDoId = JSON.parse(body).id;
      // updating existed array
      todosdata = todosdata.filter(
        (todo) => todo.id !== parseInt(deletedToDoId)
      );
      res.end(JSON.stringify({ status: "success" }));
    });
  } else if (req.url == "/todos/complete" && req.method == "PUT") {
    //Completing Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let completedToDoId = JSON.parse(body).id;
      // updating existed array
      let index = todosdata.findIndex(
        (x) => x.id === parseInt(completedToDoId)
      );
      todosdata[index].completed = true;
      res.end(JSON.stringify({ status: "success" }));
    });
  } else if (req.url == "/todos/uncomplete" && req.method == "PUT") {
    //Completing Todo
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let uncompletedToDoId = JSON.parse(body).id;
      // updating existed array
      let index = todosdata.findIndex(
        (x) => x.id === parseInt(uncompletedToDoId)
      );
      todosdata[index].completed = false;
      res.end(JSON.stringify({ status: "success" }));
    });
  }
};

const server = http.createServer(requestListener);
server.listen(8080);
