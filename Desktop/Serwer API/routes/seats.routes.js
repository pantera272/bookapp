const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { seats } = require('../db');

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(seats.filter((item) => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newData = {
    id : uuidv4(), 
    day : day,
    seat : seat,
    client : client,
    email : email 
  };
  seats.push(newData);
  res.json({message : 'Ok'});
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const index = seats.findIndex(obj => obj.id == req.params.id);
  seats[index].day = day;
  seats[index].seat = seat;
  seats[index].client = client;
  seats[index].email = email;
  res.json({message : 'OK'});
});

router.route('/seats/:id').delete((req,res) =>{
  const index = seats.findIndex(obj => obj.id == req.params.id);
  seats.splice(index, 1);
  res.json({message : 'OK'});
});

module.exports = router;