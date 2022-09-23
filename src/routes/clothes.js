'use strict';

const express = require('express');
const router = express.Router();
const { clothesInterface } = require('../models');

router.get('/clothes', async (req, res) => {
  const clothes = await clothesInterface.read();
  res.status(200).json(clothes);
});

router.get('/clothes/:id', async (req, res) => {
  let { id } = req.params;
  const clothes = await clothesInterface.read(id);
  res.status(200).json(clothes);
});

router.post('/clothes', async (req, res) => {
  console.log('Request Body:', req.body);

  const newClothes = await clothesInterface.create(req.body);
  res.status(201).send(newClothes);
});

router.put('/clothes/:id', async (req, res) => {
  const { id }= req.params;
  const update = await clothesInterface.update(req.body, id );
  res.status(200).send(`${update} updated successfully.`);
});

router.delete('/clothes/:id', async (req, res) => {
  const { id }= req.params;
  const deleted = await clothesInterface.delete(id);
  res.status(200).send(`${deleted} deleted successfully.`);
});

module.exports = router;
