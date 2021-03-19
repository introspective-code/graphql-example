import express from 'express';

const PORT = process.env.PORT || 8000;

const app = express();

app.listen(PORT, () => {
  console.log(`[ index.mjs] Server listening on port ${PORT}`)
});

app.get('/', (req, res, next) => {
  res.status(200).send('OK');
});