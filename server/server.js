//  Implement the Apollo Server and apply it to the Express server as middleware.
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth"); // middleware function for authentication

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

// ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context will be used for the the token authentication
});

// async function to start the ApolloServer
const startApolloServer = async () => {
  // integrate Apollo server with the Express application as middleware
  await server.start();
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: authMiddleware,
  })
);

// react will pull  static assets from the build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
// // integrate Apollo server with the Express application as middleware
// server.start().then(() => {
//   server.applyMiddleware({ app });
// });
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

startApolloServer();
