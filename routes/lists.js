"use strict;"
const express = require('express');
const router = express.Router();

//will add knex to get lists from DB
module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex
    .select("*")
    .from("lists")
    .then((results) => {
      res.json(results);
    });
  });

  // router.get("/:id", (req, res) => {
  //   knex
  //   .select("id")
  //   .from("lists")
  //   .where("id",1)
  //   .then((results) => {
  //     res.json(results);
  //   });
  // })
  return router;
}

