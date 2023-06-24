const { AuthenticationError } = require('apollo-server-express')
const {User} = require('../models/index')
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw new AuthenticationError("You need to be logged in!")
        },
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            if (!user){
                throw new AuthenticationError('No user found with this email address')
            }
            const correctPW = await user.isCorrectPassword(password)
            if (!correctPW){
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user)
            return {token, user}
        },
        addUser: async (parent, args) => {
            const user = await User.create({...args})
            const token = signToken(user)
            return {token, user}
        },
        saveBook: async (parent, args, context ) => {
            console.log(args)
            const user = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: {...args.content}}},
                {new: true}
            )
            return user
        },
        removeBook: async (parent, {bookId}, context) => {
            const user = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: {savedBooks: {bookId: bookId}}},
                {new: true}
            )
            return user
        },
    }
}

module.exports = resolvers