const User = require('../../models/user.model');
const Cart = require('../../models/cart.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthenticationError = require('apollo-server-errors');
const UserInputError = require('apollo-server-errors');

const EXPIRE_IN_ONE_DAY = process.env.EXPIRE_IN_ONE_DAY * 24;

module.exports = {
  Query: {
    users: () => {
        const res = User.find().catch((err)=>console.log(err));
        return res;
    },
    user: (parent, args) => {
      console.log("Get user by id :",args.id);
      return User.findById(args.id).catch((err)=>console.log(err));
    },
    login: (parent, args) => {
      const email = args.email;
      return User.findOne({ email:email })
      .then((user) => {
        if(!user) {
          throw new UserInputError(`invalid email value`);
        }
        const passwordIsValid = bcrypt.compareSync(args.password, user.password);
        if(!passwordIsValid){
          throw new AuthenticationError(`invalid password value`);
        }
        const token = jwt.sign({
          id: user._id,
          firstName : user.firstName,
          lastName : user.lastName,
          avatar : user.avatar,
          role: user.role,
          address : user.address
        },
        process.env.SECRET,
        {
          expiresIn: EXPIRE_IN_ONE_DAY
        });
        const result = {auth: true, token};
        return(result);
      })
      .catch((err) => {
        throw err;
      })
    },
    logout: () => {
      const result = {
        auth: false,
        token: null
      };
      return (result);
    },
    wishlist: (parent, args) => {
      const userId = args.userId;
      console.log("read wishlist of ",userId);
      const res = User.findById(userId).then(data=>{return data.wishlist}).catch(err=>console.log(err));
      return res;
    }
  },
  Mutation: {
    createUser: (parent, args) => {
      const email = args.email;
      return User.findOne({ email: email}).then((user)=> {
        if(!user){
          let hashedPassword = bcrypt.hashSync(args.password, 10);
          const newUser= new User({
          firstName: args.firstName,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
          address: args.address,
          email: args.email,
          password: hashedPassword,
          avatar: args.avatar,
          role: args.role,
          offers: [],
          carts: []
          });
          return newUser.save();
        }
      else {
        console.log('Account already existed');
      }
      }).catch((err)=> {
        console.log(err)
      });
    },
    updateUser: (parent, args) => {
        const res = User.findByIdAndUpdate(args.id,{firstName: args.firstName,lastName: args.lastName,email: args.email ,password: args.password, avatar: args.avatar,role: args.role, address: args.address, phoneNumber: args.phoneNumber}).catch((err)=>{console.log(err)});
        return res;
    },
    addToCart: async(parent, args) => {
    const userToUpdate = await User.findById(args.userId);
    const newCart = new Cart({
        userId: args.userId,
        productId: args.productId, 
        cartStatus: 'ValidationInProgress'
    });
    newCart.save();
    const oldCarts = userToUpdate.carts;
    const newCarts =  [...oldCarts, {cartId: newCart._id}];
    userToUpdate.carts = newCarts;
    return userToUpdate.save();
    },
    addToWishlist: async (parent, args) => {
      const userId = args.userId;
      const productId = args.productId;
      const currentWishlist = await User.findById(userId).then(data=>{return data.wishlist}).catch(err=>console.log(err));
      const newWishlist = [...currentWishlist,{productId}];
      return User.findByIdAndUpdate(userId,{wishlist: newWishlist}).then(()=>{return "add product to wishlist successfully"}).catch(err=>console.log(err));
    },
    deleteUser: (parent, args) => {
        return User.findByIdAndDelete(args.id).catch((err)=>console.log(err));
    },
    deleteAllUser: () => {
      User.deleteMany().catch((err)=>console.log(err));
      return "";
    },
  },
};
