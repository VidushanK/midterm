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
    var listName = req.body.mapname;
    knex('lists').insert({
      name: listName
    })
    .returning('id')
    .then((id) => {
      res.redirect(`/maps/${id}`);
    });
  });


  router.post("/:id/delete", (req,res) => {
    knex('lists').select('name')
    .where({'id' : req.params.id})
    .del()
    .then(function (count) {
      res.redirect('/maps');
    });
  });

  router.get("/:id/points", (req, res) => {
    knex('points')
    .where('list_id', req.params.id)
    .then((points) => {
      res.status(201).send(points);
    })
  });

  router.post("/:id/points", (req, res) => {
    const { name, lat, long } = req.body;
    knex('points').insert({
      name, lat, long, list_id: req.params.id
    }).returning('id')
    .then((id) => {
      const newPoint = {
        name: name,
        lat: lat,
        long: long,
        id: id,
        list_id: req.params.id
      };
      res.status(201).send(/*{point : newPoint} commented out for testing*/);
    });
  });

  router.post("/:id/points/delete", (req, res) => {
    let pointId = req.body.id;
    let mapId = req.params.id;
    knex('points').select('id')
    .where({id: pointId})
    .del()
    .then((count)=>{
      res.status(201).send();
      //res.redirect(`/${mapId}`);
    });
  });

  router.post("/:id/points/update", (req, res) => {
    const
    const { id, name, lat, long } = req.body;
    knex('points')
    .where({'id' : id})
    .update({
      'name' : name,
      'lat'  : lat,
      'long' : long
    }).then(()=>{
      res.status(201).send();
    });
  });

  return router;

}
