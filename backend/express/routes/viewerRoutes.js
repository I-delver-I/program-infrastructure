const express = require('express');
const Viewer = require('../models/viewer');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Viewer:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID for the viewer
 *         name:
 *           type: string
 *           description: Viewer’s name
 *         age:
 *           type: number
 *           description: Viewer’s age
 *         gender:
 *           type: string
 *           description: Viewer’s gender
 *       example:
 *         id: 64b8eec12345
 *         name: John Doe
 *         age: 25
 *         gender: Male
 */

/**
 * @swagger
 * /viewers:
 *   get:
 *     summary: Get all viewers
 *     tags: [Viewers]
 *     responses:
 *       200:
 *         description: List of all viewers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Viewer'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /viewers:
 *   post:
 *     summary: Add a new viewer
 *     tags: [Viewers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Viewer'
 *     responses:
 *       201:
 *         description: Viewer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viewer'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /viewers/{id}:
 *   get:
 *     summary: Get a viewer by ID
 *     tags: [Viewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the viewer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Viewer object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viewer'
 *       404:
 *         description: Viewer not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /viewers/{id}:
 *   put:
 *     summary: Update a viewer by ID
 *     tags: [Viewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the viewer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Viewer'
 *     responses:
 *       200:
 *         description: Viewer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viewer'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Viewer not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /viewers/{id}:
 *   delete:
 *     summary: Delete a viewer by ID
 *     tags: [Viewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the viewer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Viewer deleted successfully
 *       404:
 *         description: Viewer not found
 *       500:
 *         description: Server error
 */

router.get('/', async (req, res) => {
  try {
    const viewers = await Viewer.find();
    res.json(viewers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const viewer = await Viewer.findById(req.params.id);
    if (!viewer) {
      return res.status(404).json({ message: 'Viewer not found' });
    }
    res.json(viewer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const viewer = new Viewer({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  });

  try {
    const newViewer = await viewer.save();
    res.status(201).json(newViewer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedViewer = await Viewer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, age: req.body.age, gender: req.body.gender },
      { new: true }
    );

    if (!updatedViewer) {
      return res.status(404).json({ message: 'Viewer not found' });
    }

    res.json(updatedViewer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedViewer = await Viewer.findByIdAndDelete(req.params.id);

    if (!deletedViewer) {
      return res.status(404).json({ message: 'Viewer not found' });
    }

    res.json({ message: 'Viewer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
