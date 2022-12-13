import fs from "node:fs";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const schema = fs.readFileSync(path.resolve("schema.graphql"), "utf8");

const resolvers = {
  Query: {
    currentDateTime: () => new Date().toISOString(),
  },
};

async function main() {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
