import { MutationReturn, Resolvers, User } from '../../__generated__/graphql'
import { TMessage, TopicEnum } from '../../messaging/KafkaProducer'

const accountResolvers: Resolvers = {
  Query: {
    me: (_, args, context) => {
      return { id: 'user-1', email: 'dummy' }
    },
  },
  Mutation: {
    signUp: async (_, { input }, { producerPromise }) => {
      const { email, password } = input
      const message: TMessage = {
        key: 'register',
        value: {
          email: email,
          password: password,
        },
      }
      const producer = await producerPromise
      producer.publish(TopicEnum.account, message)
      return MutationReturn.Accepted
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
