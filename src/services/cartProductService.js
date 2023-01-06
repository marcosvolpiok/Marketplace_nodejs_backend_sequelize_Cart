class cartProductService {
    constructor(cartProductRepository, queueHelper) {
        this.cartProductRepository = cartProductRepository;
        this.queueHelper = queueHelper;
      }
      
      listById = async (req, res) => {
          const cart=await this.cartProductRepository.listById(req.params.idCart);
          
          return cart;
      }

      add = async (req, res) => {
        const cart=await this.cartProductRepository.add({
            idCustomer: res.userData.idCustomer,
            idShop: req.body.idShop,
            idProduct: req.body.idProduct,
            quantity: req.body.quantity
        });
        
        return cart;
    }

    delete = async (req, res) => {
        const cart=await this.cartProductRepository.delete({
            idCustomer: res.userData.idCustomer,
            idCart: req.body.idCart,
            idProduct: req.body.idProduct,
            res: res
        });
        
        return cart;
    }

    update = async (req, res) => {
        const cart=await this.cartProductRepository.update(
        {
            id: req.body.id,
            quantity: req.body.quantity,
            res: res
        });
        
        return cart;
    }

    createOrderFromCart = async (req, res) => {

        // const cart=await this.cartRepository.createOrderFromCart(
        //     req.params.idShop,
        //     req.params.state,
        //     res
        // );
        
        // return cart;

        // var amqp = require('amqplib/callback_api');
        // amqp.connect('amqp://172.17.0.3', function(error0, connection) {
        //     if (error0) {
        //         throw error0;
        //     }
        //     connection.createChannel(function(error1, channel) {
        //         if (error1) {
        //             throw error1;
        //         }

        //         var queue = 'hello';
        //         var msg = 'Hello World!';

        //         channel.assertQueue(queue, {
        //             durable: false
        //         });
        //         channel.sendToQueue(queue, Buffer.from(msg));

        //         console.log(" [x] Sent %s", msg);
        //         return {status: 'OK'}
        //     });
        //     setTimeout(function() {
        //         connection.close();
        //     }, 500);
        // });

        //return {status: 'OK'}


        //const amqp = require('amqplib/callback_api');
        const amqp = require('amqplib');

        let connection = await amqp.connect('amqp://172.17.0.3');  
        console.log('connectionnnn', connection)

        const channel = await connection.createChannel();

        var queue = 'hello';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    

        setTimeout(function() {
            connection.close();
        }, 500);

        return {status: 'OK'}
    }      
}

module.exports = cartProductService;