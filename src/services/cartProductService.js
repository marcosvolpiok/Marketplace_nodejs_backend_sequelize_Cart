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
        //console.log(this.queueHelper);
        const queue = 'hello';
        const message = 'Hi Mark!!!';

        this.queueHelper.sendMessage(queue, message);


        return {status: 'OK', message: message}
    }      
}

module.exports = cartProductService;