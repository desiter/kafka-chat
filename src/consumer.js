const initConsumer = require('./initConsumer')
const argv = require('minimist')(process.argv.slice(2));

console.log('initializing kafka...\n')
initConsumer(argv.broker, argv.topic, argv.group)
  .then(consumer => {
    process.stdin.resume();
    process.on('SIGINT', () => {
      consumer.disconnect()
    });
  })
