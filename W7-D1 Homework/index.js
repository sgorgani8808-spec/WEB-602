// index.js
const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

function allTodos() {
  return [
    { id: 1, name: "Finished writing a blogpost" },
    { id: 2, name: "Get pizza for dinner" },
    { id: 3, name: "Wake up at 7:30am" }
  ];
}

app.get("/", (req, res) => {
  res.send({
    date: new Date(),
    msg: "Greetings!"
  });
});

app.get("/todo", (req, res) => {
  res.send(allTodos());
});

app.get("/todo/:id", (req, res) => {
  const todoId = Math.abs(Number(req.params.id));
  const todos = allTodos();
  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).send({ error: "Todo not found" });
  }

  res.send(todo);
});

app.get("/joke", (req, res) => {
  const url = "https://api.chucknorris.io/jokes/random";

  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      res.send(JSON.parse(data));
    });
  }).on("error", (err) => {
    res.status(500).send({ error: err.message });
  });
});

// ✅ Only start server when NOT running tests
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// ✅ Export for Supertest
module.exports = app;
