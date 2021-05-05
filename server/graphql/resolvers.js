const User = require('../models/user');
const Product = require('../models/product');
const Category = require("../models/Category");
const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const validator = require("validator");
const {setTokens, tokenCookies} = require('../jwt-token/tokens');

module.exports = {
    createUser: async ({ userInput }, req) => {
       const existingUser = await User.findOne({email: userInput.email})
       const errors = [];
       if(!validator.isEmail(userInput.email)) {
           errors.push({message: "email is invalid"});
       }
       if(errors.length > 0) {
           const error = new Error('invalid input');
           error.data = errors
           throw error;
       }
       if(existingUser) {
           const error = new Error('user already exists');
           throw error;
       }
       const hashwdPw = await bcrypt.hash(userInput.password, 12);
       const user = new User({
         
           name: userInput.name,
           email: userInput.email,
           password: hashwdPw,
       })
       const createdUser = await user.save();
       return {...createdUser._doc, _id: createdUser._id.toString() }
    },
    loginUser: async ({ email, password }, { res }) => {
        const user = await User.findOne({email: email});
        if(!user) {
            const error = new Error('No user found');
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            const error = new Error('wrong password');
            throw error;

        }
        const tokens = setTokens(user)

        const cookies = tokenCookies(tokens);
        res.cookie(...cookies.access);
        res.cookie(...cookies.refresh);
        console.log(cookies)

      
        return {...user._doc, userId: user._id.toString() };

    },

    logout: async  ({email},{ res }) => {

        res.clearCookie("access");
        res.clearCookie("refresh");
        return true;
      },

      createCategory: async ({categoryInput}) => {
          
        const cat = await Category.findOne({
            title: categoryInput.title
          })
        if (cat) {
                console.log('cat already exists');
                return;
              }
        const category = new Category({
            title: categoryInput.title,
            id: categoryInput.id,
            })
            const createdCategory = await category.save();
            return {...createdCategory._doc, _id: createdCategory._id.toString() }
      },

      createProduct: async ({productInput}) => {
        const product = new Product({
         
            name: productInput.name,
            price: productInput.price,
            imageUrl: productInput.imageUrl,
            category: productInput.category
        })
        const createdProduct = await product.save();
        await addProduct(createdProduct)
        return {...createdProduct._doc, _id: createdProduct._id.toString() }

      },

      getProductsByCategory: async ({title}) => {
          const product = await Category.findOne({title})
          .populate({
            path: 'items',
            options: {
              limit: 9,
              sort: {
                _id: -1
              },
            }
          })
          .catch(err => {
              return console.log(err)
          })
        
          return {...product._doc, _id: product._id.toString() }
      },

     getCategory: async ({res}) => {
       const category = Category.find({}, (err, products) => {
            var productsMap = {};
        
            products.forEach(function(prod) {
              productsMap[prod._id] = prod;
            });
        
            return productsMap
          });
          return category
     },

     createCart: async({cartInput}) => {

        const user = await User.findOne({_id: cartInput.userId.toString()})
       try {
        let cart = await Cart.findOne({user});
        const productDetails = await Product.findById(cartInput.productId);

        if (cart) {
          //cart exists for user
          let itemIndex = cart.products;
          const sameProd =  itemIndex.findIndex(p => p.productId == cartInput.productId )
            
    
          if (sameProd !== -1) {
            cart.products[sameProd].qty =
            cart.products[sameProd].qty + 1;
            cart.products[sameProd].total = 
            cart.products[sameProd].qty * productDetails.price;
            cart.products[sameProd].price = productDetails.price;
            
            cart.subTotal = cart.products.map(item => 
              item.total).reduce((acc, next) => acc + next)

            //console.log(subTotal)
          } else {
            //product does not exists in cart, add new item
           
            cart.products.push({
               productId: cartInput.productId.toString(),
               name: productDetails.name,
               imageUrl: productDetails.imageUrl,
               qty: cartInput.qty,
               price: cartInput.price,
               total: cartInput.price });
            cart.subTotal = cart.products.map(item => 
              item.total).reduce((acc, next) => acc + next)
          }
          cart = await cart.save();
          return {...cart._doc}
        } else {
         
          const newCart =  new Cart({
            user: cartInput.userId.toString(),
            products: [{
               productId:cartInput.productId.toString(),
               qty: cartInput.qty,
               price: cartInput.price,
               total: cartInput.price,
               imageUrl: productDetails.imageUrl,
               name: productDetails.name}],
            subTotal: cartInput.price
          });
          await newCart.save();
    
          return {...newCart._doc}
        }
      } catch (err) {
        console.log(err.message);
        
      }

     },

     removeProduct: async ({cartInput}) => {
      const user = await User.findOne({_id: cartInput.userId.toString()})
      try {

        let cart = await Cart.findOne({user})

          cart.products.map( async prod =>  {
           if(prod.productId.toString() === cartInput.productId.toString())
           {
             if(prod.qty === 1) {
               deleteProduct(cart, cartInput)
               cart.subTotal = cart.subTotal - prod.price
              cart = await cart.save();
                return true
      
               
             }
             
             else {
             
    
              if (prod.qty !== 1) {
                prod.qty = prod.qty - 1;
                prod.total = prod.qty * prod.price;
                prod.price = prod.price;
              }
              cart.subTotal = cart.products.map(item => 
                item.total).reduce((acc, next) => acc + next)
              cart = await cart.save();
                return true
               
             }

           }
        })
       
       

      }catch(err) {
        console.log(err.message)
      }
    },
     

     getCart: async ({userId}, {res}) => {
      const user = await User.findOne({_id: userId.toString()})

      const cart = await Cart.findOne({user})
      if(!cart) {
        return;
      }
      try {
        await cart.populate({
          path: 'products', 
        })
        return {...cart._doc }

      }catch(err) {
        return err.message;
      }
     }
      
    
}

const addProduct = async function(product) {
    return Product.create(product)
      .then(prod => {

        let title = prod.category;
        Category.findOne({
            title: title
          })
          .then(cat => {
              console.log(cat)
            return Category.findByIdAndUpdate(
              cat._id, {
                $push: {
                  items: prod._id, 
                }
              }, {
                new: true,
                useFindAndModify: false
              }
            );
          })
          .catch(err => {
              return console.log(err);
          });
      });
};

const deleteProduct = async (inputCart, input) => {
  
      return Cart.findByIdAndUpdate(
          inputCart._id, {
            $pull: {
              products: {
                productId: input.productId,
          
              }
            }
          }, {
            new: true,
            useFindAndModify: false
          }
        )
        .catch(err => {
            return console.log(err);
        });
    
  
  

}


  