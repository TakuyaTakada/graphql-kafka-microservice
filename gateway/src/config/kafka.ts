import { GlobalConfig } from 'node-rdkafka'

export const kafkaGlobalConfig: GlobalConfig = {
  'bootstrap.servers': process.env.KAFKA_SERVERS || 'localhost:9092',
}
