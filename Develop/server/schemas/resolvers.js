const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (_, { userId, username }) => {
      const foundUser = await User.findOne({
        $or: [{ _id: userId }, { username: username }],
      });

      if (!foundUser) {
        throw new Error('Cannot find a user with this id/username!');
      }

      return foundUser;
    },
  },

  Mutation: {
    createUser: async (_, { userInput }) => {
      const user = await User.create(userInput);

      if (!user) {
        throw new Error('Something is wrong!');
      }

      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { loginInput }) => {
      const user = await User.findOne({
        $or: [{ username: loginInput.username }, { email: loginInput.email }],
      });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(loginInput.password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { userId, bookInput }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to save book');
      }
    },

    deleteBook: async (_, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
