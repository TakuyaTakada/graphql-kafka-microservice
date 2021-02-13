import { ApolloServer, PubSub } from 'apollo-server'
import schema from './modules'

const pubsub = new PubSub()

const server = new ApolloServer({
  schema,
  context: ({ req, connection }) => {
    if (connection) {
      return { ...connection.context, pubsub }
    }
    return { ...req, pubsub }
  },
})

const hostname = process.env.APOLLO_HOSTNAME || 'localhost'
const port = process.env.APOLLO_PORT || 4000

server.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://${hostname}:${port}${server.graphqlPath}`
  )
  console.log(
    `🚀 Server ready at ws://${hostname}:${port}${server.subscriptionsPath}`
  )
})
