class cartController{
  constructor(cartService) {
    this.cartService=cartService;
  }

  list = async (req, res) => { 
    try{
      const cart=await this.cartService.list(req);
      res.json(cart);
    }catch(e){
      res.status(500).json({message: e.message})
    }
  }

  listByIdUser = async (req, res) => { 
    try{
      const cart=await this.cartService.listByIdUser(res);
      res.json(cart);
    }catch(e){
      res.status(500).json({message: e.message})
    }
  }

  listByIdUserAndIdShop = async (req, res) => { 
    try{
      const cart=await this.cartService.listByIdUserAndIdShop(req, res);
      res.json(cart);
    }catch(e){
      res.status(500).json({message: e.message})
    }
  }  
}


module.exports = cartController;