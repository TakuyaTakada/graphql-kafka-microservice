import { PubSub } from 'apollo-server'
import KafkaProducer from './messaging/KafkaProducer'
import FirebaseService from './authentication/FirebaseService'

type Context = {
  pubsub: PubSub
  producerPromise: Promise<KafkaProducer>
  firebase: FirebaseService
}
