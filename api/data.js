import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function handler(req, res) {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const Data = mongoose.models.Data || 
      mongoose.model('Data', new mongoose.Schema({
        text: String
      }));

    if (req.method === 'POST') {
      const newData = await Data.create({ text: req.body.text });
      return res.status(200).json(newData);
    } 
    
    if (req.method === 'GET') {
      const allData = await Data.find();
      return res.status(200).json(allData);
    }
    
  } catch (error) {
    return res.status(500).json({ error: 'Error processing request' });
  }
}