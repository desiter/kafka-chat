const kafka = require('node-rdkafka');

const DEFAULT_KAFKA_HOST = 'localhost:9092'

module.exports = function initProducer(kafkaHost) {
  return new Promise((resolve, reject) => {
    const producer = new kafka.Producer({
      // 'debug': 'all',
      'metadata.broker.list': kafkaHost || DEFAULT_KAFKA_HOST,
    });
    producer.on('ready', () => {
      console.log('producer ready.');
      producer.setPollInterval(500)
      resolve(producer)
    })
    producer.on('event.error', console.error)
    producer.on('disconnected', () => {
      console.log('producer disconnected.');
      process.exit(0)
    });
    producer.on('event.log', function(event) {
      console.log(event)
    })
    producer.connect();
  })
}
