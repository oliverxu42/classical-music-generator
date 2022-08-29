import express from 'express';
import axios from 'axios';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/get-works', async (req, res) => {
  const isPopularWork = req.query.popWork;
  console.log(isPopularWork);
  const response = await axios.get('https://api.openopus.org/dyn/work/random', {
    params: { popularwork: isPopularWork },
  });
  const data = response.data;
  console.log(data);
  res.status(200).json(data);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
