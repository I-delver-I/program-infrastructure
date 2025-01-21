const express = require('express');
const Order = require('../models/order');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - viewerId
 *         - ticketId
 *         - sellerId
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID for the order
 *         viewerId:
 *           type: string
 *           description: ID of the viewer placing the order
 *         ticketId:
 *           type: string
 *           description: ID of the ticket associated with the order
 *         sellerId:
 *           type: string
 *           description: ID of the seller processing the order
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Date of the order
 *       example:
 *         id: 64b8eec12345
 *         viewerId: 64b8eec67890
 *         ticketId: 64b8eec54321
 *         sellerId: 64b8eec98765
 *         orderDate: 2025-01-20T12:34:56Z
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/filter:
 *   get:
 *     summary: Filter orders by various criteria
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: Start date for filtering orders (YYYY-MM-DD format)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: End date for filtering orders (YYYY-MM-DD format)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: sellerId
 *         required: false
 *         description: Filter by seller ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: position
 *         required: false
 *         description: Filter by seller position
 *         schema:
 *           type: string
 *       - in: query
 *         name: sellerName
 *         required: false
 *         description: Filter by seller name (partial match)
 *         schema:
 *           type: string
 *       - in: query
 *         name: minSalary
 *         required: false
 *         description: Minimum salary for filtering sellers
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxSalary
 *         required: false
 *         description: Maximum salary for filtering sellers
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Filtered list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */

router.get('/filter', async (req, res) => {
  const { startDate, endDate, sellerId, position, minSalary, maxSalary, sellerName } = req.query;

  const query = {};
  const sellerQuery = {};

  if (startDate || endDate) {
    query.orderDate = {};
    if (startDate) query.orderDate.$gte = new Date(startDate);
    if (endDate) query.orderDate.$lte = new Date(endDate);
  }

  if (sellerId) query.sellerId = sellerId;
  if (position) sellerQuery.position = position;
  if (sellerName) sellerQuery.name = new RegExp(sellerName, 'i');
  if (minSalary || maxSalary) {
    sellerQuery.salary = {};
    if (minSalary) sellerQuery.salary.$gte = Number(minSalary);
    if (maxSalary) sellerQuery.salary.$lte = Number(maxSalary);
  }

  try {
    const orders = await Order.find(query)
      .populate({
        path: 'sellerId',
        match: sellerQuery, // Filter sellers based on sellerQuery
      })
      .populate('viewerId')
      .populate('ticketId');

    // Remove orders where sellerId doesn't match the sellerQuery
    const filteredOrders = orders.filter(order => order.sellerId);

    res.json(filteredOrders);
  } catch (err) {
    res.status(500).json({ message: `Error filtering orders: ${err.message}` });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('viewerId')
      .populate('ticketId')
      .populate('sellerId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('viewerId')
      .populate('ticketId')
      .populate('sellerId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const order = new Order({
    viewerId: req.body.viewerId,
    ticketId: req.body.ticketId,
    sellerId: req.body.sellerId,
    orderDate: req.body.orderDate,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        viewerId: req.body.viewerId,
        ticketId: req.body.ticketId,
        sellerId: req.body.sellerId,
        orderDate: req.body.orderDate,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
