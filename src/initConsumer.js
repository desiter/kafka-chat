const kafka = require('node-rdkafka');

const DEFAULT_KAFKA_HOST = 'localhost:9092'

module.exports = function initConsumer(kafkaHost, topic, groupId) {
  return new Promise((resolve, reject) => {
    const consumer = new kafka.KafkaConsumer({
      //'debug': 'all',
      'metadata.broker.list': kafkaHost || DEFAULT_KAFKA_HOST,
      'group.id': groupId || 'test',
      'enable.auto.commit': true
    })

    consumer.on('ready', (arg, metadata) => {
      console.log('consumer ready.', arg, metadata);
      consumer.subscribe([topic || 'UnleashChat'])
      consumer.consume();
      resolve(consumer)
    })
    consumer.on('data', function(msg) {
      // consumer.commitMessage(msg);

      // Output the actual message contents
      console.log(JSON.stringify(msg));
      //console.log(`${new Date(msg.timestamp)} ${msg.key.toString()}: ${msg.value.toString()}`);

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
