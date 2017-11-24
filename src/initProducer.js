const kafka = require('node-rdkafka');

const DEFAULT_KAFKA_HOST = 'localhost:9092'

module.exports = function initProducer(kafkaHost) {
  return new Promise((resolve, reject) => {
    const producer = new kafka.Producer({
      // 'debug': 'all',
      'metadata.broker.list': kafkaHost || DEFAULT_KAFKA_HOST,
      'dr_cb': true,
    });
    producer.on('ready', (arg, metadata) => {
      console.log('producer ready:\n', arg, metadata);
      producer.setPollInterval(500)
      resolve(producer)
    })
    producer.on('delivery-report', function(err, report) {
      if (err) {
        console.error(err);
        return
      }
      console.log('delivery-report: ' + JSON.stringify(report));
    });
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
