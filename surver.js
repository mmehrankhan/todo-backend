import express from "express";
import cors from "cors";
import './database.js'
import { Todo } from "./models/index.js";

const app = express();
const port = process.env.PORT || 5001;

const todos = [];

app.use(express.json()); // To convert body into JSON
app.use(cors({origin:['http://localhost:5173',' https://mehran-todo.surge.sh']}));

app.get("/api/v1/todos",async (request, response) => {
const todos = await Todo.find()
  const message = !todos.length ? "todos empty" : "all todos fetched";

  response.status(200).send({ data: todos, message: message });
});

// naya todo bannae kaly
app.post("/api/v1/todo", async(request, response) => {
  const obj = {
    todoContent: request.body.todo,
    ip: request.ip,
  };

const res = await Todo.create(obj)

console.log('res,',res);


  // todos.push(obj);

  response.status(201).send({ message: "todo add hogya hy", data: obj });
});

// ye todo ko update ya edit karne ki api hy
app.patch("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // idher product mil chuka hy (ab us product ko edit karna hy)

      todos[i].todoContent = request.body.todo;
      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(200).status(201).send({
      data: { todoContent: request.body.todoContent, id: id },
      message: "todo updated successfully!",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

app.delete("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // idher product mil chuka hy (ab us product ko delete karna hy)

      todos.splice(i, 1);

      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(200).send({
      // data: { todoContent: request.body.todoContent, id: id, },
      message: "todo deleted successfully!",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

//

app.use((request, response) => {
  response.status(404).status(404).send("no route found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
