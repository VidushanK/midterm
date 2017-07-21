"use strict;"
const express = require('express');
const router = express.Router();

//will add knex to get lists from DB
module.exports = (knex) => {

  router.get('/', (req, res) => {
    res.render("index")
    knex
    .select("*")
    .from("lists")
    .then((results) => {
      res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    res.render("maps_show");
    knex
    .select("id")
    .from("lists")
    .where("id",1)
    .then((results) => {
      res.json(results);
    });
  });

  router.get("/new",(req, res) => {
    res.render("maps_new");
  });

  router.get("/:id/edit", (req, res) => {

    knex
    .select("id")
    .from("lists")
    .where("id",1)
    .then((results) => {
      res.json(results);
    });
  });

  return router;
}
