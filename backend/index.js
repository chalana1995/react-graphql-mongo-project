import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mergeTypeDef from "./typeDefs/index.js";
import mergeResolver from "./resolvers/index.js";

const server = new ApolloServer({
  typeDefs: mergeTypeDef,
  resolvers: mergeResolver,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
