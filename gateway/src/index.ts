import { ApolloServer, PubSub } from 'apollo-server'
import schema from './modules'
import KafkaProducer from './messaging/KafkaProducer'
import { kafkaGlobalConfig } from './config/kafka'

const pubsub = new PubSub()
const producerPromise = KafkaProducer.init(kafkaGlobalConfig)

const server = new ApolloServer({
  schema,
  context: ({ req, connection }) => {
    const context = connection || req
    return { ...context, pubsub, producerPromise }
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
