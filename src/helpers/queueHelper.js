
class queueHelper{
    constructor(amqplib) {
      this.amqp = amqplib;
      this.connectionInstance = null;
      this.connectionInstance = this.getConnectionInstance();
    }

    getConnectionInstance = async () => {
        if(this.connectionInstance == null) {
            this.connectionInstance = await this.getClientConnection();
        }

        return this.connectionInstance;
    }

    getClientConnection = async () => {
        const connection = await this.amqp.connect('amqp://172.17.0.3');  

        return connection;
    }

    sendMessage = async (queue, message) => {
        const channel = await this.connectionInstance.createChannel();

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(message));

        return message;
    }
}

module.exports = {queueHelper};