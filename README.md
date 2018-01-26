# kafka-chat
Unleashconf 2017 - Kafka integration example

## Dependencies
  - [Nodejs v6.9.1+](https://nodejs.org/en/)
  - [Yarn 1.2.1+](https://yarnpkg.com/en/)
  - [Docker](https://docs.docker.com/engine/installation/) (optional)

## Installation
```sh
  $ git clone https://github.com/desiter/kafka-chat.git
  $ yarn
```

## Kafka Producer CLI
```sh
  $ yarn run producer --broker=host:port --topic=some_topic [--key=the_key]
```
Paremeters:
  - `--broker` is required unless you are about to connect the local docker-composed default kafka broker
  - `--topic` desired topic name to send a message to (defaults to `UnleashChat`)
  - `--key` omit unless you want to force total order over all messages sent here

## Kafka Consumer CLI
```sh
  $ yarn run consumer --broker=host:port --topic=some_topic --group=some_group
```

Paremeters:
  - `--broker` is required unless you are about to connect the local docker-composed default kafka broker
  - `--topic` desired topic name to subscribe to (defaults to `UnleashChat`)
  - `--group` (optional) your consumer group (defaults to `test`)

## Local Kafka cluster (docker-compose)
To spin up your own local kafka cluster run the following command
```sh
  $ docker-compose up -d
```
