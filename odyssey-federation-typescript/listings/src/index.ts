import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers.js";
import { ListingAPI } from "./datasources/listing-api.js";

const typeDefs = gql(
    readFileSync(path.resolve(import.meta.dirname, "./schema.graphql"), {
        encoding: "utf-8",
    }),
);

async function startApolloServer() {
    const server = new ApolloServer({
        schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    });
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
}

startApolloServer();
