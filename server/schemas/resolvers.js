const {User} = require('../models/index')
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async () => {},
    },
    Mutation: {
        login: async (parent, {email, password}) => {},
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