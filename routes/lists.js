"use strict;"
const express = require('express');
const router = express.Router();

//will add knex to get lists from DB
module.exports = (knex) => {
  router.get('/lists', (req, res) => {
    knex
      .select("*")
      .from("lists")
      .then((results) => {
        res.json(results);
      });
    });
  return router;
}

