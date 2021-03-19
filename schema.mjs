import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    getMessage: String
  }
`);

export const rootValue = {
  getMessage: () => 'Hello World'
}
