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
      res.render("index",{maps: results});
    });
  });

  router.get("/:id", (req, res) => {
    knex
    .select("id")
    .from("lists")
    .where("id",req.params.id)
    .limit(1)
    .then(([result]) => {
      res.render("maps_show",{map: result});
    });
  });

  router.get("/new",(req, res) => {
    res.render("maps_new");
  });

  router.get("/:id/edit", (req, res) => {
    Promise.all([
      knex('lists').where({id: req.params.id}),
      knex('points').where({list_id: req.params.id})
      ]).then(([[list], points]) => {
        res.render('map', {map, points});
      });
    });

  return router;

}
