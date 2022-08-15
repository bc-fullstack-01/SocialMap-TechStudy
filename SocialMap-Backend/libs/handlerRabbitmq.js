const { connect } = require("amqplib")

module.exports = class RabbitmqServer {
    constructor() {
        this.uri = process.env.AMQP_URL
    }

    async start() {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    async createQueue(queue_name, queueOptions) {
        await this.channel.assertQueue(queue_name, queueOptions)
    }

    async createExchange(exchange_name, type, exchangeOptions) {
        await this.channel.assertExchange(exchange_name, type, exchangeOptions)
    }

    async connectQueueExchange(queue_name, exchange_name, key) {
        await this.channel.bindQueue(queue_name, exchange_name, key)
    }

    async publishInQueue(queue, message) {
        return this.channel.sendToQueue(queue, Buffer.from(message));
    }

    async publishInExchange(exchange, routingKey, message, headers={}) {
        return this.channel.publish(exchange, routingKey, Buffer.from(message), {headers:headers});
    }

    async consume(queue, callback) {
        return this.channel.consume(queue, (message) => {
            callback(message);
            this.channel.ack(message);
        });
    }
}

