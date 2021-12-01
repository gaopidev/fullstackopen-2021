require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan((tokens, req, res) => {
    console.log(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);
// Error handler
/*
Routes
*/
// Get all people
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((error) => {
      //console.error(err);
      next(error);
    });
});

// Get info about phonebook
app.get("/info", (req, res) => {
  Person.count({})
    .then((total) =>
      res.send(
        `<p>Phonebook has info for ${total} people</p><p>${new Date()}</p>`
      )
    )
    .catch((error) => {
      //console.error(err);
      next(error);
      //res.send(`<p>Phonebook has info for ${total} people</p><p>${new Date()}</p>`);
    });
});

// Get info by id
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => {
      //console.error(error);
      next(error);
      //res.status(400).send({ error: "Malformatted id" });
    });
});

//Delete person by id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      //console.log(result);
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

// Add person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedFormattedPErson) => res.json(savedFormattedPErson))
    .catch((error) => next(error));
});

// Edit person
app.put("/api/persons/:id", (req, res) => {
  Person.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    number: req.body.number,
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log("Aqui paso el error");
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
