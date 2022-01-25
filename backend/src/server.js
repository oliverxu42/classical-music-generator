import express from 'express';
import axios from 'axios';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/get-works', async (req, res) => {
  const response = await axios.post('https://api.openopus.org/dyn/work/random');
  const data = response.data;
  res.status(200).json(data);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));