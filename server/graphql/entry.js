const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');

const app = express();
const PORT = 3001;

const entries = [];

app.use(express.json());

app.post('/api/entries', (req, res) => {
  const { entry } = req.body;
  if (!entry) {
    return res.status(400).json({ error: 'Entry is required' });
  }
  entries.push(entry);
    return res.status(201).json({ entry });
});

app.get('/api/entries', (req, res) => {
  return res.json(entries);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});

app.listen({ PORT }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);