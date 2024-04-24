// define query and mutation functionality for models (mongoose)
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: aysnc (parent, args, context) => {
    }
}