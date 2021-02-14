import { PubSub } from 'apollo-server'
import KafkaProducer from './messaging/KafkaProducer'

type Context = {
  pubsub: PubSub
  producerPromise: Promise<KafkaProducer>
}
