const resolvers = {
    Query: {
        me: async () => {},
    },
    Mutation: {
        login: async (parent, {email, password}) => {},
        addUser: async (parent, {username, email, password}) => {},
        saveBook: async (parent, {bookId, authors, description, title, image, link}) => {},
        removeBook: async (parent, {bookId}) => {},
    }
}

module.exports = resolvers