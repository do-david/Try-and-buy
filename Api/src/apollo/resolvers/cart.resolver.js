const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model')

module.exports = {
  Query: {
    carts: () => {
        return Cart.find().catch((err)=>console.log(err));
    },
    cart: (parent, args) => {
      return Cart.findById(args.id).catch((err)=>console.log(err));
    },
    cartsByBuyerID: (parent, args) => {
      return Cart.find({buyerID: args.id}).catch((err)=>console.log(err));
    } ,

    cartsBySellerID: (parent, args) => {
      return Cart.find({sellerID: args.id})
      .catch((err)=>console.log(err));
    } ,

  } , 

  Mutation : {

    createCart : (parent , args)=>{
      const cart = new Cart({
        buyerID : args.buyerID , 
        sellerID : args.sellerID ,
        productId : args.productID ,
        cartStatus : "ValidationInProgress"
      })

      return cart.save()
    } , 

    deleteCart : (parent , args)=>{

      return Cart.findByIdAndDelete(args.id).catch(error=>console.log(error))
    } ,

    decisionCart : (parent , args)=>{

      return Cart.findByIdAndUpdate(args.id,{cartStatus:args.decision})
      .then(result=>{
        if(args.decision=="Validated")
        {
        const productId = result.productId
          Product.findByIdAndUpdate(productId , {productStatus :"SellingInProgress"}).catch(error=>{
          console.log(error);
        })

        }
           if(args.decision=="Canceled")
        {
        const productId = result.productId
          Product.findByIdAndUpdate(productId , {productStatus :"ToSell"}).catch(error=>{
          console.log(error);
        })

        }
       

      })
      .catch(error=>{
        console.log(error);
      })
    }
  }
};
