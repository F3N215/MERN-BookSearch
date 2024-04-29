// define query and mutation functionality for models (mongoose)
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");
        return userData;
      }
      throw new AuthenticationError("You have to login first!");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("books");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(user); // generates jwt token
      return { token, user }; // returns token and user data
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (
      parent,
      { bookId, authors, title, description, image, link },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: { bookId, authors, title, description, image, link },
            },
          },
          { new: true, runValidators: true }
        ).populate("savedBooks");
        return updatedUser;
      } catch (err) {
        console.error(err);
        throw new Error("Something went wrong with these books!");
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate("savedBooks");
        if (!updatedUser) {
          throw new Error("Couldn't find a user with this id!");
        }
        return updatedUser;
      } catch (err) {
        console.error(err);
        throw new Error("You can't remove this book!");
      }
    },
  },
};

module.exports = resolvers;
