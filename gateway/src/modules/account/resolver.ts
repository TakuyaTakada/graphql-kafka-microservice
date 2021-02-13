import { MutationReturn, Resolvers, User } from '../../__generated__/graphql'

const accountResolvers: Resolvers = {
  Query: {
    me: (_, args, context) => {
      return { id: 'user-1' }
    },
  },
  Mutation: {
    register: (_, args, context) => {
      return MutationReturn.Accepted
    },
    login: (_, { input }, { pubsub }) => {
      const { id } = input
      pubsub.publish('FriendLoggedIn', { id })
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
