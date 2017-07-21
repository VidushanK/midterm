"use strict;"
const express = require('express');
const router = express.Router();

//will add knex to get lists from DB
module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex
    .select("*")
    .from("points")
    .where("list_id", req.query["list_id"])
    .then((results) => {
      res.json(results);
    });
  });


  return router;
}

