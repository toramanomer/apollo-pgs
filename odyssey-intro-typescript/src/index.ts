import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers.js";
import { ListingAPI } from "./datasources/listing-api.js";
import { DataSourceContext } from "./context.js";

const typeDefs = gql(
    readFileSync(path.resolve(import.meta.dirname, "./schema.graphql"), {
        encoding: "utf-8",
    }),
);

const server = new ApolloServer({ typeDefs, resolvers: resolvers });
const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                listingAPI: new ListingAPI({ cache }),
            },
        };
    },
});
console.log(`
  🚀  Server is running!
  📭  Query at ${url}
`);
