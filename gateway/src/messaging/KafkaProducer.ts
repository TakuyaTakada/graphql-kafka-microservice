import { AdminClient, Producer, GlobalConfig, IAdminClient } from 'node-rdkafka'

export type TMessage = {
  key: string
  // eslint-disable-next-line
  value: any
}

export enum TopicEnum {
  account = 'account-service',
}

const ERR_TOPIC_ALREADY_EXISTS = 36

export default class KafkaProducer {
  private adminClient!: IAdminClient
  private producer!: Producer

  constructor(adminClient: IAdminClient, producer: Producer) {
    this.adminClient = adminClient
    this.producer = producer
  }

  static async init(config: GlobalConfig) {
    const adminClient = KafkaProducer.createAdminClient(config)
    const producer = await KafkaProducer.createProducer(config)
    return new KafkaProducer(adminClient, producer)
  }

  static createAdminClient(config: GlobalConfig) {
    return AdminClient.create(config)
  }

  static createProducer(config: GlobalConfig) {
    const producer = new Producer({
      ...config,
      dr_msg_cb: true,
    })

    return new Promise<Producer>((resolve, reject) => {
      producer
        .on('ready', () => resolve(producer))
        .on('delivery-report', (err, report) => {
          if (err) {
            console.warn('Error producing', err)
          }
          const { topic, partition, value } = report
          console.log(
            `Successfully produced record to topic "${topic}" partition ${partition} ${value}`
          )
        })
        .on('event.error', (err) => {
          console.warn('event.error', err)
          reject(err)
        })
      producer.connect()
    })
  }

  private ensureTopicExists(topicName: string) {
    return new Promise<void>((resolve, reject) => {
      this.adminClient.createTopic(
        {
          topic: topicName,
          num_partitions: 1,
          replication_factor: 1,
        },
        (err) => {
          if (!err) {
            console.log(`Created topic ${topicName}`)
            return resolve()
          }

          if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
            return resolve()
          }

          return reject(err)
        }
      )
    })
  }

  private produce(topicName: TopicEnum, message: TMessage) {
    const buffedValue = Buffer.from(JSON.stringify(message.value))
    this.producer.produce(topicName, null, buffedValue, message.key, Date.now())
  }

  async publish(topicName: TopicEnum, message: TMessage | TMessage[]) {
    await this.ensureTopicExists(topicName)

    if (Array.isArray(message)) {
      message.forEach((msg) => {
        this.produce(topicName, msg)
      })
    } else {
      this.produce(topicName, message)
    }

    this.producer.flush(10000, (err) => {
      console.error('Could not produce message', err)
      this.producer.disconnect()
    })
  }
}
