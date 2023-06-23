const { AuthenticationError } = require('apollo-server-express')
const {User} = require('../models/index')
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async () => {},
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
        saveBook: async (parent, {bookId, authors, description, title, image, link}) => {},
        removeBook: async (parent, {bookId}) => {},
    }
}

module.exports = resolvers