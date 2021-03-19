import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, rootValue } from './schema.mjs';

const PORT = process.env.PORT || 8000;

const app = express();

app.listen(PORT, () => {
  console.log(`[ index.mjs] Server listening on port ${PORT}`)
});

app.get('/', (req, res, next) => {
  res.status(200).send('OK');
});

app.use(
  '/api',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);
