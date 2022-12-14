class cartService {
    constructor(cartRepository) {
        this.cartRepository=cartRepository;
      }
      
      list = async (req, res) => {
          const cart=await this.cartRepository.list(req);
          
          return cart;
      }

      listByIdUser = async (res) => {
          const cart=await this.cartRepository.listByIdUser(res);
          
          return cart;
      }

      listByIdUserAndIdShop = async (req, res) => {
        
        const cart=await this.cartRepository.listByIdUserAndIdShop(
            req.params.idShop,
            req.params.state,
            res
        );
        
        return cart;
    }  
}

module.exports = cartService;