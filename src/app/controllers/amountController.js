const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Amount = require('../models/Amount');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  Amount.find({}, (error, amount) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ amount });
  }).populate('user');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const amount = await Amount.create({ ...req.body, user: req.userId });

    return res.send({ amount })
  } catch (err) {
    return res.status(400).send({ error: "Error creating new Amount." })
  }
});

// READ
router.get('/:amountId', async (req, res) => {
  try {
    const amount = await Amount.findById(req.params.amountId).populate('user');

    return res.send({ amount })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the Amount." })
  }
});

// UPDATE
router.put('/:amountId', async (req, res) => {
  try {
    const { cep, street, number } = req.body;
    const amount = await Amount.findByIdAndUpdate(req.params.amountId, {
      cep,
      street,
      number
    }, { new: true }).populate('user');

    return res.send({ amount })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the Amount." })
  }
});

// DELETE
router.delete('/:amountId', async (req, res) => {
  try {
    const amount = await Amount.findByIdAndRemove(req.params.amountId).populate('user');

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Amount." })
  }
});

module.exports = app => app.use('/amount', router);