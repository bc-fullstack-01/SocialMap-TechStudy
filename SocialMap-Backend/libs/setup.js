const RabbitmqServer = require("./handlerRabbitmq");
const logger = require("log4js").getLogger("aplication");

async function setQueue() {
    const server = new RabbitmqServer();
    await server.start();

    await server.createExchange('notifications', 'direct', { durable: true })
    await server.createQueue('post-new', { durable: true })
    await server.createQueue('post-like', { durable: true })
    await server.createQueue('comment-new', { durable: true })
    await server.createQueue('follow-new', { durable: true })

    await server.connectQueueExchange('post-new', 'notifications', 'post-new')
    await server.connectQueueExchange('post-like', 'notifications', 'post-like')
    await server.connectQueueExchange('comment-new', 'notifications', 'comment-new')
    await server.connectQueueExchange('follow-new', 'notifications', 'follow-new')
 

    await server.createExchange('save-data', 'direct', { durable: true })
    await server.createQueue('post', { durable: true })
    
    await server.connectQueueExchange('post', 'save-data', 'post')

    logger.warn('Setup rabbitMQ');

}

module.exports = setQueue