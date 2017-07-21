"use strict;"
const express = require('express');
const router = express.Router();

//will add knex to get lists from DB
module.exports = (knex) => {
  router.get('/points', (req, res) => {
    knex
    .select("*")
    .from("points")
    .then((results) => {
      res.json(results);
    });
  });


  return router;
}

