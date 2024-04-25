import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, passowrd, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("User Already exits");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(passowrd, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            name,
            password: hashPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
        })

        await newUser.save();
        await context.login(newUser);
        return newUser

      } catch (error) {
        console.error("Error in signUp", error);
        throw new Error(error.message || "Internal Server Error")
      }
    },
    login: async(_,{input},context) => {
      try {
        const {username,passoword} = input;
        const {user} = await context.authenticate("graphql-local",{username,passoword});

        await context.login(user);
        return user;
      } catch (error) {
         console.error("Error in signUp", error);
         throw new Error(error.message || "Internal Server Error");
      }
    }
  },
  Query: {
    users: (_, _, { req, res }) => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
