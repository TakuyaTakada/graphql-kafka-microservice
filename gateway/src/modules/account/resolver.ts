import { MutationReturn, Resolvers, User } from '../../__generated__/graphql'

const accountResolvers: Resolvers = {
  Query: {
    me: (_, args, context) => {
      return { id: 'user-1', email: 'dummy' }
    },
  },
  Mutation: {
    signUp: async (_, { input }, { firebase }) => {
      return await firebase.signUpWithEmailAndPassword(input)
    },
    signIn: (_, { input }, { pubsub }) => {
      const { email, password } = input
      pubsub.publish('FriendLoggedIn', { email })
      return MutationReturn.Accepted
    },
  },
  Subscription: {
    friendLoggedIn: {
      subscribe: (_, args, { pubsub }) => {
        return pubsub.asyncIterator('FriendLoggedIn')
      },
      resolve: (value: User) => {
        return value
      },
    },
  },
}

export default accountResolvers
