"use strict;"
const express = require('express');
const router = express.Router();


module.exports = () => {
  router.get('/', (req, res) => {
    let result = [
      {
        id : "1",
        name: "Best Pizza"
      },
      {
        id: "2",
        name: "Nice Trees"
      },
      {
        id: "3",
        name:"Cool Shoes"
      }
    ];
    res.json(result);
  });



  return router;
}

