import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { Pool } from 'pg';

const cors = Cors();

// Initialize Neon connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Define schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: async () => {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT NOW()');
        return `Hello from Neon! Time: ${result.rows[0].now}`;
      } finally {
        client.release();
      }
    },
  },
};

// Configure Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};