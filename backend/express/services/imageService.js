const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'sellers');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const _allowedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

/**
 * Validate the uploaded image's MIME type
 * @param {string} mimeType - The MIME type of the file
 * @returns {boolean}
 */
const validateImageFormat = (mimeType) => {
  return _allowedImageFormats.includes(mimeType);
};

/**
 * Save an uploaded image to the file system
 * @param {string} sellerId - The ID of the seller
 * @param {Object} file - The file object from multer
 * @returns {string} - Path to the saved image
 */
const saveImage = (sellerId, file) => {
  if (!validateImageFormat(file.mimetype)) {
    throw new Error('Invalid image format. Only JPEG, PNG, and GIF are allowed.');
  }

  const uniqueFileName = `${sellerId}_${Date.now()}${path.extname(file.originalname)}`;
  const filePath = path.join(UPLOADS_DIR, uniqueFileName);

  fs.renameSync(file.path, filePath);

  return `/uploads/sellers/${uniqueFileName}`;
};

/**
 * Delete an existing image from the file system
 * @param {string} imagePath - Path to the image file to delete
 */
const deleteImage = (imagePath) => {
  const absolutePath = path.join(__dirname, '..', imagePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

/**
 * Update the seller's image: delete old image and save a new one
 * @param {string} sellerId - The ID of the seller
 * @param {Object} file - The new file object from multer
 * @param {string|null} oldImagePath - Path to the old image (if it exists)
 * @returns {string} - Path to the new saved image
 */
const updateImage = (sellerId, file, oldImagePath) => {
  // Delete the old image if it exists
  if (oldImagePath) {
    deleteImage(oldImagePath);
  }

  // Save the new image
  return saveImage(sellerId, file);
};

module.exports = {
  validateImageFormat,
  saveImage,
  deleteImage,
  updateImage,
};