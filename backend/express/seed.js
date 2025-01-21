require('dotenv').config();
const mongoose = require('mongoose');
const Viewer = require('./models/viewer');
const Ticket = require('./models/ticket');
const Seller = require('./models/seller');
const Order = require('./models/order');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cinema', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await Viewer.deleteMany({});
    await Ticket.deleteMany({});
    await Seller.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    const viewers = await Viewer.insertMany([
      { name: 'John Doe', age: 30, gender: 'Male' },
      { name: 'Jane Smith', age: 25, gender: 'Female' },
    ]);
    console.log('Seeded Viewers:', viewers);

    const tickets = await Ticket.insertMany([
      { movieTitle: 'Avengers: Endgame', seatNumber: 'A10', showTime: new Date('2025-01-25T18:30:00Z') },
      { movieTitle: 'Inception', seatNumber: 'B15', showTime: new Date('2025-01-26T20:00:00Z') },
    ]);
    console.log('Seeded Tickets:', tickets);

    const sellers = await Seller.insertMany([
      { name: 'Alice', age: 40, gender: 'Female', position: 'Manager', salary: 5000 },
      { name: 'Bob', age: 35, gender: 'Male', position: 'Cashier', salary: 3000 },
    ]);
    console.log('Seeded Sellers:', sellers);

    const orders = await Order.insertMany([
      { viewerId: viewers[0]._id, ticketId: tickets[0]._id, orderDate: new Date('2025-08-20T10:22:16Z'),
        sellerId: sellers[0]._id
       },
      { viewerId: viewers[1]._id, ticketId: tickets[1]._id, orderDate: new Date('2025-08-20T10:24:16Z'),
        sellerId: sellers[0]._id
       },
    ]);
    console.log('Seeded Orders:', orders);

    mongoose.connection.close();
    console.log('Seeding complete. Connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedData();