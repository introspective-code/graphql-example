import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, rootValue } from './schema.mjs';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`[ index.mjs] Server listening on port ${PORT}`)
});

app.get('/', (req, res, next) => {
  const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>GraphQL Example</title>
    </head>
    <body>
      <h1>GraphQL Example</h1>
      <div id="user-cities"></div>
      <script>
        fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: \`
            query {
              getUsers {
                id
                name
                city {
                  id
                  name
                  population
                }
              }
            }\`
          }),
        })
        .then(res => res.json())
        .then(res => {
          document
            .getElementById('user-cities')
            .innerHTML = JSON.stringify(res.data.getUsers)
        });
      </script>
    </body>
    </html>
  `

  res.status(200).send(template);
});

app.use(
  '/api',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);
