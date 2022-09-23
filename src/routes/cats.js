'use strict';

const express = require('express');
const router = express.Router();
const { catsInterface } = require('../models');

router.get('/cats', async (req, res) => {
  const cats = await catsInterface.read();
  res.status(200).json(cats);
});

router.get('/cats/:id', async (req, res) => {
  let { id } = req.params;
  const cats = await catsInterface.read(id);
  res.status(200).json(cats);
});

router.post('/cats', async (req, res) => {
  console.log('Request Body:', req.body);

  const newCat = await catsInterface.create(req.body);
  res.status(201).send(newCat);
});

router.put('/cats/:id', async (req, res) => {
  const { id }= req.params;
  const update = await catsInterface.update(req.body, id );
  res.status(200).send(`${update} updated successfully.`);
});

router.delete('/cats/:id', async (req, res) => {
  const { id }= req.params;
  const deleted = await catsInterface.destroy(id);
  res.status(200).send(`${deleted} deleted successfully.`);
});

module.exports = router;
