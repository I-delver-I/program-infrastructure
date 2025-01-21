const express = require('express');
const Seller = require('../models/seller');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID for the seller
 *         name:
 *           type: string
 *           description: Seller's name
 *         age:
 *           type: number
 *           description: Seller's age
 *         gender:
 *           type: string
 *           description: Seller's gender
 *         position:
 *           type: string
 *           description: Seller's position
 *         salary:
 *           type: number
 *           description: Seller's salary
 *       example:
 *         id: 64b8eec12345
 *         name: John Doe
 *         age: 35
 *         gender: Male
 *         position: Manager
 *         salary: 7000
 */

/**
 * @swagger
 * /sellers:
 *   get:
 *     summary: Get all sellers
 *     tags: [Sellers]
 *     responses:
 *       200:
 *         description: List of all sellers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seller'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers:
 *   post:
 *     summary: Add a new seller
 *     tags: [Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seller'
 *     responses:
 *       201:
 *         description: Seller created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers/{id}:
 *   get:
 *     summary: Get a seller by ID
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers/{id}:
 *   put:
 *     summary: Update a seller by ID
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seller'
 *     responses:
 *       200:
 *         description: Seller updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers/{id}:
 *   delete:
 *     summary: Delete a seller by ID
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller deleted successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */

router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const seller = new Seller({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    position: req.body.position,
    salary: req.body.salary,
  });

  try {
    const newSeller = await seller.save();
    res.status(201).json(newSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        position: req.body.position,
        salary: req.body.salary,
      },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json(updatedSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.id);

    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json({ message: 'Seller deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
