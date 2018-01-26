const kafka = require('node-rdkafka');

const DEFAULT_KAFKA_HOST = 'localhost:9092'

module.exports = function initConsumer(kafkaHost, topic, groupId) {
  return new Promise((resolve, reject) => {
    const consumer = new kafka.KafkaConsumer({
      //'debug': 'all',
      'metadata.broker.list': kafkaHost || DEFAULT_KAFKA_HOST,
      'group.id': groupId || 'test',
      'auto.offset.reset': 'earliest',
      'enable.auto.commit': false
    })

    consumer.on('ready', () => {
      console.log('consumer ready.');
      consumer.subscribe((topic || 'UnleashChat').split(','))
      consumer.consume();
      resolve(consumer)
    })
    consumer.on('data', function(msg) {
      const time = (new Date(msg.timestamp)).toLocaleTimeString()
      const key = (msg.key || '').toString()
      const value = (msg.value || '').toString()
      console.log(`${time} ${key}: ${value}`);
    });
    consumer.on('event.error', console.error)
    consumer.on('disconnected', () => {
      process.exit(0)
    });
    consumer.on('event.log', function(event) {
      console.log(event)
    })
    consumer.connect();
  })


}
