const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { concerts}= require('../db');

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(concerts.filter((item) => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newData = {
    id: uuidv4(), 
    performer : performer, 
    genre : genre, 
    price : price,
    day : day,
    image : image
  };
  concerts.push(newData);
  res.json({message : 'Ok'});
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const index = concerts.findIndex(obj => obj.id == req.params.id);
  concerts[index].performer = performer;
  concerts[index].genre = genre;
  concerts[index].price = price;
  concerts[index].day = day;
  concerts[index].image = image;
  res.json({message : 'OK'});
});

router.route('/concerts/:id').delete((req,res) =>{
  const index = concerts.findIndex(obj => obj.id == req.params.id);
  concerts.splice(index, 1);
  res.json({message : 'OK'});
});

module.exports = router;