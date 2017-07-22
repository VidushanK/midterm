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
      res.render("maps",{maps: results});
    });
  });

  router.get("/:id", (req, res) => {
    knex
    .select("id")
    .from("lists")
    .where("id", Number(req.params.id))
    .limit(1)
    .then(([result]) => {
      res.render("index",{map: result});
    });
  });

  router.get("/new",(req, res) => {
    res.render("maps_new");
  });

  router.post("/",(req, res) => {
    console.log(req.body);
    res.redirect("/");
  });

  router.get("/:id/points", (req, res) => {
    knex('points').where('list_id', req.params.id).then(points => {
      res.json(points);
    })
  });

  router.post("/:id/points", (req, res) => {
    const { name, lat, long } = req.body;
    knex('points').insert({
      name, lat, long, list_id: req.params.id
    }).then(() => {
      res.json({
        success: 'ok'
      })
    })
  })

  return router;

}
