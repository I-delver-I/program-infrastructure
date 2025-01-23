const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Seller = require('../models/seller');
const router = express.Router();

const ImageService = require('../services/imageService');

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and GIF files are allowed.'));
    }
    cb(null, true);
  },
});

const uploadDir = 'uploads/sellers';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
 *         imagePath:
 *           type: string
 *           description: Path to the seller's uploaded image
 *       example:
 *         id: 64b8eec12345
 *         name: John Doe
 *         age: 35
 *         gender: Male
 *         position: Manager
 *         salary: 7000
 *         imagePath: /uploads/sellers/64b8eec12345_1674868239000.jpg
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

/**
 * @swagger
 * /sellers/{id}/image:
 *   post:
 *     summary: Upload an image for a seller
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid image or seller not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers/{id}/image:
 *   get:
 *     summary: Get a seller's image
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller's image
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Seller or image not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers/{id}/image:
 *   delete:
 *     summary: Delete a seller's image
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Seller or image not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sellers/{id}/image:
 *   put:
 *     summary: Update a seller's image
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image updated successfully
 *                 imagePath:
 *                   type: string
 *                   example: /uploads/sellers/<filename>
 *       400:
 *         description: Invalid image or seller not found
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */

router.put('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const updatedImagePath = ImageService.updateImage(seller.id, req.file, seller.imagePath);
    seller.imagePath = updatedImagePath;
    await seller.save();

    res.json({ message: 'Image updated successfully', imagePath: updatedImagePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id/image', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller || !seller.imagePath) return res.status(404).json({ message: 'Image not found' });

    ImageService.deleteImage(seller.imagePath);
    seller.imagePath = null;
    await seller.save();

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const newImagePath = ImageService.saveImage(seller.id, req.file);
    seller.imagePath = newImagePath;
    await seller.save();

    res.json({ message: 'Image uploaded successfully', imagePath: newImagePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id/image', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller || !seller.imagePath) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const filePath = path.join(__dirname, '..', seller.imagePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Image file not found on the server.' });
    }

    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
