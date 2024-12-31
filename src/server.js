const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://MoviesUser:passwordMOV@apikeys.dmrv56o.mongodb.net/taskManagerTasks')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create Schema
const dataSchema = new mongoose.Schema({
  text: String
});

// Create Model
const Data = mongoose.model('Data', dataSchema);

// POST route to save data
app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data({
      text: req.body.text
    });
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all data
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});