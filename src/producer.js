const readline = require('readline');
const initProducer = require('./initProducer')
const argv = require('minimist')(process.argv.slice(2));
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
let producer

console.log('initializing kafka...\n')
initProducer(argv.broker)
  .then(producer => {
    io.setPrompt('> ')
    io.prompt()
    io.on('line', function(line){
        try {
          console.log(argv.topic || 'UnleashChat', -1, new Buffer(line), argv.key || 'Test')
          producer.produce(argv.topic || 'UnleashChat', -1, new Buffer(line), argv.key || 'Test')
        } catch (err) {
          console.error('A problem occurred when sending our message')
          console.error(err)
        }
        io.prompt()
    })
    io.on('SIGINT', () => {
      producer.disconnect()
    })
  })
