const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { testimonials } = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomId = Math.floor(Math.random() * testimonials.length);
  res.json(testimonials[randomId]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(testimonials.filter((item) => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newData = {id: uuidv4(), author: author, text: text};
  testimonials.push(newData);
  res.json({message : 'Ok'});
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const index = testimonials.findIndex(obj => obj.id == req.params.id);
  testimonials[index].author = author;
  testimonials[index].text = text;
  res.json({message : 'OK'});
});

router.route('/testimonials/:id').delete((req,res) =>{
  const index = testimonials.findIndex(obj => obj.id == req.params.id);
  testimonials.splice(index, 1);
  res.json({message : 'OK'});
});

module.exports = router;