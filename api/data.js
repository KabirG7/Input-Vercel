import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      
      const Data = mongoose.models.Data || 
        mongoose.model('Data', new mongoose.Schema({
          text: String
        }));

      const newData = await Data.create({ text: req.body.text });
      res.status(200).json(newData);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
  }
}