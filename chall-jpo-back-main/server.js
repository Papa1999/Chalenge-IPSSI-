const express = require("express");
const cors = require("cors");
const lespokemon = require("./pokemons.json");
const InformationsPokemon = require("./infospokemons.json");
var bodyParser = require("body-parser");

const DEFAULT_LIMIT = 10;
const app = express();

/* 
    Middlewares of the application 
*/

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Autres en-têtes CORS et méthodes autorisées peuvent être spécifiés ici
  next();
});

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Autorise les requêtes depuis cette origine
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Autorise les méthodes HTTP spécifiées
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Autorise les en-têtes HTTP spécifiés
  next();
});

/* 
    Endpoints of the application 
*/

app.get("/", (request, response) => {
  response.status(200).send("Everything seems to work !");
});

// app.get("/nombrePoke", (req, res) => {
//   res.status(200).json(pokemon.length);
// });

// app.get("/api/infoPokemon/:id", (req, res) => {
//   const id = req.params.id;
// });
app.get("/api/pokemon/:nom", (req, res) => {
  const nom = req.params.nom;
  const lePokemon = InformationsPokemon.find((jeu) => jeu.name === nom);
  res.status(200).json(lePokemon);
});

app.get("/api/infoPokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const lePokemon = InformationsPokemon.find((jeu) => jeu.id === id);
  console.log(lePokemon);
  res.status(200).json(lePokemon);
});

app.get("/api/pokemon", (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const startIndex = offset;
  const endIndex = startIndex + limit;
  const totalPokemon = lespokemon.length;
  const paginatedPokemon = lespokemon.slice(startIndex, endIndex);
  const nextOffset = startIndex + limit;
  const previousOffset = Math.max(0, startIndex - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;

  res.status(200).json({
    totalPokemon,
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get("/api/pokemon/:offset/:limit", (req, res) => {
  const offset = req.params.offset ? parseInt(req.params.offset) : 0;
  const limit = req.params.limit ? parseInt(req.params.limit) : DEFAULT_LIMIT;
  const nextOffset = offset + limit;
  const previousOffset = Math.max(0, offset - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;
  const paginatedPokemon = lespokemon.slice(offset, offset + limit);

  res.status(200).json({
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

/* 
      Listen's Port 
*/

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
