import cookieParser from 'cookie-parser';
import express from 'express'  ///ES6
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import web from './routes/web.js'
import {join} from 'path'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const app=express();

app.use(cookieParser())
dotenv.config({
path:'./config.env'
})


const port = process.env.PORT || '6584'
  

mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log('DB connected sucessfully....')
})
const con=mongoose.connection;



app.use(express.urlencoded({extended:false}))
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import User from './models/user.js';
import Seller from './models/sellers.js'
import Petinfo from './models/petinfos.js'
import Product from './models/products.js'
import Cart from './models/cartitem.js'
import Wish from './models/wishitem.js'
import Order from './models/orders.js'
import Review from './models/reviews.js'
import complaint from './models/complaint.js'
import Saloon from './models/saloon.js'
import Service from './models/service.js'
import Payment from './models/payment.js'
//set template engine
app.set('view engine','ejs')


app.get('/sell' ,(req,res)=>{
  Petinfo.find().then(products=>{
    res.render('sellnav',{products})
  })
})
app.get('/selllogin' ,(req,res)=>{
  res.render('selllogin')
})
app.get('/sellsignup' ,(req,res)=>{
  res.render('sellsignup')
})

app.get('/sellform', (req, res) => {
  let sellregister = req.cookies.sellregister;
  res.render('sellform')
  console.log(sellregister)
});

app.get('/sellnext' ,(req,res)=>{
  res.render('sellnext')
})
app.get('/petconfirm' ,(req,res)=>{
  res.render('petadded')
})
app.get('/logout' ,(req,res)=>{
  res.render('logout')
})
app.get('/register',(req,res)=>{
  var register=req.cookies.register;
  res.render('main_after')
  console.log(register)
})
app.get('/admin/product',(req,res)=>{
  res.render('product-form')
})
app.get('/admin/pet',(req,res)=>{
  res.render('pet-form')
})

app.get('/complaint',(req,res)=>{
  res.render('complaintform')
})
app.get('/paymentsaloon',(req,res)=>{
  res.render('payment_saloon')
})

app.get('/addsaloon',(req,res)=>{
  res.render('saloon_add')
})

 

app.use('/static', express.static(join(process.cwd(),'public')))
app.use('/css',express.static(join(process.cwd(),'public/css')))
app.use('/js',express.static(join(process.cwd(),'public/js')))
  
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})

  const phoneRegex = /^[6789]\d{9}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordRegex = /^.{8,}$/;

function validateForm(phoneno,emailidd,password3) {
    let isValid = true;
    if (!phoneRegex.test(phoneno)) {
        isValid = false;
      
     } 
    
    if (!emailRegex.test(emailidd)) {
        isValid = false;
       
    }
   
    if (!passwordRegex.test(password3)) {
        isValid = false;
       
     }
   
    return isValid
}
function svalidateform(sphoneno,semailid,spassword){
  let valid=true;
  if(!phoneRegex.test(sphoneno)){
    valid=false;
  }
  if(!emailRegex.test(semailid)){
    valid=false;
  }
  if(!passwordRegex.test(spassword)){
    valid=false;
  }
  return valid;
}



 

app.get('/viewcomplaints',(req,res)=>{
  complaint.find().then(complaints=>{
    res.render('admin_complaints',{complaints})
  })
})

app.post('/single-product', async(req,res)=>{
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  const reviews = await Review.find({"product_id":productId});
  res.render('single',{product,reviews})
})
app.post('/register',async (req,res)=>{
    const hashPassword = await bcrypt.hash(req.body.password,10)
   if (validateForm(req.body.phno,req.body.email,req.body.password)){
    const newUser = new User({
      fullname: req.body.fullname,
      phoneNumber: req.body.phno,
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
    });
    res.cookie('register',req.body)
    con.collection('users').insertOne(newUser)
    .then((result)=>{
     
      res.status(200).redirect('/login')
    })
    .catch((err)=>{
      if (err.code === 11000) {
        const message = err.message;
        const usernameMatch = message.match(/username/);
        const emailMatch = message.match(/email/);
        const passwordMatch = message.match(/password/);
        if (usernameMatch) {
          console.error('Username already exists');
        
         
        } else if (emailMatch) {
          console.error('Email already exists');
         
        } else if (passwordMatch) {
          console.error('Password already exists');
        
        } else {
          console.error('Unique index violation:', err);
        }
      } else {
        console.error('Error saving the user:', err);
      }
     })
   }
  
})




  var id2

app.post('/search',async(req,res)=>{
 
    try{
      var search = req.body.search;
     var products=await Product.find({"name":{$regex:'.*'+search+'.*',$options:'i'}});
      if(products.length>0){
        res.render('dog_products',{products})
      }else{
       res.render('oops')
      }
    }
    catch(error){
      res.status(400).send({success:false,msg:error.message})
    }
  
})

app.post('/login', async (req, res) => {
      const username = req.body.lusername;
    const password = req.body.lpassword;

    res.cookie('username',username)
    
    User.findOne({ username}).then(user => {
        if (user) {
          bcrypt.compare(password,user.password,function(err,result){
            if(result == true){
              res.cookie('id',user._id)
              console.log("login successful")
              // console.log(req.cookies.id)
              res.redirect('/main')
            }
            else{
              res.send("login failed")
            }
          })
        } 
      })
  
});

app.get('/account', (req, res) => {
  const username = req.cookies.username
  User.findOne({ username}).then(user => {
    res.render('account', { user });
  })
});
// app.post('/review',(req,res)=>{
//   const newreview = new Review({
//     username:username,
//     product_id:req.body.productId,
//     review:req.body.review,
//     star:req.body.star
//   })
//   con.collection('reviews').insertOne(newreview)
 
// })
app.post('/review',(req,res)=>{
  const username= req.cookies.username
  const newreview = new Review({
    username:username,
    product_id:req.body.productId,
    review:req.body.review,
    star:req.body.star
  })
  con.collection('reviews').insertOne(newreview)
  res.redirect('/main')
})
  
app.post('/update', async (req, res) => {
    const username = req.cookies.username
    const hashpassword = await bcrypt.hash(req.body.password,10)
    if (validateForm(req.body.phonenumber,req.body.email,req.body.password)){
    User.findOneAndUpdate(username, {
      fullname:req.body.fullname,
      email:req.body.email,
      phoneNumber:req.body.phonenumber,
      username:req.body.username,
      password:hashpassword
    })
      .then(() => {
        res.cookie('username',req.body.username)
        res.render('main_after')
      })
      .catch(err => {
        console.error('Error updating user', err);
        res.send('Error updating profile!');
      });}
      else{
        res.send('validation not approved')
      }
});
  

app.post('/sellregister',async (req,res)=>{
    const hashpass = await bcrypt.hash(req.body.spass1,10)
    if (svalidateform(req.body.sphonenumber,req.body.semail,req.body.spass1)){
     const newSeller = new Seller({
       sfullname: req.body.sfname,
       sphoneNumber: req.body.sphonenumber,
       semail: req.body.semail, 
       susername: req.body.suname,
       spassword: hashpass,
     });
     res.cookie('sellregister',req.body)
     con.collection('sellers').insertOne(newSeller)
     .then((result)=>{
      
       res.status(200).redirect('/selllogin')
     })
     .catch((err)=>{
       if (err.code === 11000) {
         const message = err.message;
         const usernameMatch = message.match(/susername/);
         const emailMatch = message.match(/semail/);
         const passwordMatch = message.match(/spassword/);
         if (usernameMatch) {
           console.error('sUsername already exists');
      
           // Show an alert or handle the error as appropriate
         } else if (emailMatch) {
           console.error('sEmail already exists');
           // Show an alert or handle the error as appropriate
         } else if (passwordMatch) {
           console.error('sPassword already exists');
           // Show an alert or handle the error as appropriate
         } else {
           console.error('sUnique index violation:', err);
         }
       } else {
         console.error('sError saving the user:', err);
       }
      })
    }
   
})

app.post('/slogin', (req, res) => {
    const  susername = req.body.sluname;
    const  spassword = req.body.slpass;
    console.log(susername,spassword)
    const seller_username=req.body.sluname
    res.cookie('seller_username',seller_username)
    Seller.findOne({ susername})
      .then(seller => {
        if (seller) {
          bcrypt.compare(spassword,seller.spassword,function(err,result){
            if(result==true){
              console.log(seller)
          res.redirect('/sellform')
          app.get('/sellersaccount', (req, res) => {
            res.render('sellersaccount', { seller });
          });
            }
            else {
              res.send('Login failed!');
            }
          })
        } 
      })
      .catch(err => {
        console.error('Error finding user', err);
        res.send('Login failed!');
      });
    
});
  
  console.log("hii")

app.post('/sellersupdate',async (req, res) => {
    const id = req.body.id
    console.log("hi")
    const hashpassword = await bcrypt.hash(req.body.password,10)
    if (svalidateform(req.body.phoneNumber,req.body.email,req.body.password)){
    Seller.findByIdAndUpdate(id, {
      sfullname:req.body.fullname,
      semail:req.body.email,
      sphoneNumber:req.body.phoneNumber,
      susername:req.body.username,
      spassword:hashpassword
    })
      .then(() => {
        Seller.findById(id)
          .then(seller => {
            res.render('sellersaccount', { seller });
          })
          .catch(err => {
            console.error('Error finding user', err);
            res.send('Error updating profile!');
          });
      })
      .catch(err => {
        console.error('Error updating user', err);
        res.send('Error updating profile!');
      });}
      else{
        res.send('validation not approved')
      }
});
//new
app.post('/petinfo',(req,res)=>{
  const seller_username = req.cookies.seller_username
     const newpetinfo = new Petinfo({
       title: req.body.title,
       username:seller_username,
       description: req.body.description,
       race: req.body.category, 
       breed: req.body.breed,
       gender: req.body.gender,
       price: req.body.price,
       age: req.body.age,
       weight: req.body.weight,
       location: req.body.location,
       name: req.body.name,
       piphoneNumber: req.body.phone,
       image: req.body.image,
     });
     con.collection('petinfos').insertOne(newpetinfo)
     res.redirect('/petpost')
    }
   )
   app.get('/petpost',(req,res)=>{
    const seller_username = req.cookies.seller_username
    console.log(seller_username)
    Petinfo.find({ "username":seller_username })
    .then(petinfos => {
      if (petinfos) {
        // console.log(petinfos)
        res.render('petposts', {petinfos})
      }})
   })
   //new
   app.post('/sf',(req,res)=>{
    res.redirect("/sellform")
   }
)

   //new
app.get('/sf/:id', (req, res) => {
    Petinfo.findByIdAndRemove(req.params.id)
    .then((deletedProduct) => {
      console.log(`Deleted product: ${deletedProduct}`);
      res.redirect('/petpost');
    })
    .catch((err) => {
      console.log(`Error deleting product: ${err}`);
      res.redirect('/sell');
    });
  
});
app.post('/single-product', async(req,res)=>{
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  res.render('single',{product})
})



app.post('/add-to-cart-dog', async (req, res) => {
  const productId = req.body.productId;
  const userId = req.cookies.id;
  

  try {
    const product = await Product.findById(productId);
    const existingCart = await Cart.findOne({ userId: userId });
    
    if (existingCart) {
      const item = existingCart.items.find(item => item.productId == productId);
      if (item) {
        await Cart.findOneAndUpdate(
  { userId: userId },
  { $set: { 
    'items.$[elem].productId': productId,
    'items.$[elem].title': product.name,
    'items.$[elem].description': product.description,
    'items.$[elem].price': product.price,
    'items.$[elem].image': product.image,
  } },
  { 
    arrayFilters: [{ 'elem.productId': productId }],
    upsert: true 
  }
);

      } else {
        // Add a new product to the cart
        await Cart.findOneAndUpdate(
          { userId: userId },
          { $push: { items: { 
            productId: productId, 
            title: product.name,
            description: product.description,
            price: product.price,
            image:product.image
          } } },
          { upsert: true }
        );
      }
    } else {
      console.log(product.title)
      // Create a new cart with the first product
      const cartData = {
        userId: userId,
        items: [{ 
          productId: productId, 
          title: product.name,
          description: product.description,
          price: product.price,
          image:product.image
        }]
      };
      const newCart = await Cart.create(cartData);
      console.log(newCart);
    }
    res.redirect('/dogs');
   
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

app.post('/add-to-cart-cat', async (req, res) => {
  const productId = req.body.productId;
  const userId = req.cookies.id;
  

  try {
    const product = await Product.findById(productId);
    const existingCart = await Cart.findOne({ userId: userId });
    
    if (existingCart) {
      const item = existingCart.items.find(item => item.productId == productId);
      if (item) {
        await Cart.findOneAndUpdate(
  { userId: userId },
  { $set: { 
    'items.$[elem].productId': productId,
    'items.$[elem].title': product.name,
    'items.$[elem].description': product.description,
    'items.$[elem].price': product.price,
    'items.$[elem].image': product.image,
  } },
  { 
    arrayFilters: [{ 'elem.productId': productId }],
    upsert: true 
  }
);

      } else {
        // Add a new product to the cart
        await Cart.findOneAndUpdate(
          { userId: userId },
          { $push: { items: { 
            productId: productId, 
            title: product.name,
            description: product.description,
            price: product.price,
            image:product.image
          } } },
          { upsert: true }
        );
      }
    } else {
      console.log(product.title)
      // Create a new cart with the first product
      const cartData = {
        userId: userId,
        items: [{ 
          productId: productId, 
          title: product.name,
          description: product.description,
          price: product.price,
          image:product.image
        }]
      };
      const newCart = await Cart.create(cartData);
      console.log(newCart);
    }

    res.redirect('/cats');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});
app.post('/update-cart', async (req, res) => {
  const userId = req.cookies.id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: userId, 'items.productId': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );

    res.redirect('/cart');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});
const updateProductQuantity = async (productId, quantity) => {
  try {
    console.log('ostunava')
    await Product.findByIdAndUpdate(productId, { $inc: { available: -quantity } });
  } catch (error) {
    console.log(error);
  }
}

app.get('/single', (req,res)=>{
  res.render('single')
})
app.post('/buy-now', async (req, res) => {
  const id = req.cookies.id;
  try {
    const cart = await Cart.findOne({ userId: id });
    const user= await User.findOne({userId:id})
    if (!cart || cart.items.length === 0) {
      res.redirect('/cart');
      return;
    }
    for (let item of cart.items) {
            const product = await Product.findById(item.productId);
            if (product.available < item.quantity) {
              return res.render('out-of-stock', { product });
            }
          }
    // Create order and populate items array
    const items = cart.items.map((item) => ({
      productId: item.productId,
      title:item.title,
      image:item.image,
      quantity: item.quantity,
      price: item.price,
    }));
    const order = new Order({
      userId: id,
      items: items,
      total: cart.totalPrice,
    });
    await order.save();
    for (let i = 0; i < items.length; i++) {
      const { productId, quantity } = items[i];
      await updateProductQuantity(productId, quantity);
    }
    // Clear cart for user
    await Cart.findOneAndDelete({ userId: id });

    res.render('payment', { order: order,id });
  } catch (err) {
    console.log(err);
    res.redirect('/cart');
  }
});
app.get('/admin/order',async(req,res)=>{
  const id=req.cookies.id;
  
   
    const orders = await Order.find().sort({ date: -1 });
    const payment = await Payment.findOne({userid:id});
    const user = await User.findOne({userid:id});
    console.log(payment)
    res.render('admin_order', { orders,payment ,user});
 

})
app.post('/paymentcnf',(req,res)=>{
  const address=req.body.address
  const id = req.cookies.id;
  console.log(id)
  const newPayment = new Payment({
    userid:id,
    address:address
  });

  newPayment.save()
    .then(payment => {
      res.render('paymentcnf')
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Failed to add payment",
        error: err.message
      });
    });

})
app.get('payment', async (req, res) => {
  const id = req.cookies.id;
  try {
    const order = await Order.findOne({ userId: id }).populate('items.productId');
    res.render('payment', { order: order });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

app.get('/cart', async (req, res) => {
  const id1= req.cookies.id
  console.log(id1)

  try {
    const cart = await Cart.findOne({ userId: id1 });

    if (cart && cart.items.length > 0) {
      res.render('cart', { cart: cart });
    } else {
      res.render('cart', { cart: null });
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});
app.get('/wish', async (req, res) => {
  const id1= req.cookies.id
  console.log(id1)

  try {
    const wish = await Wish.findOne({ userId: id1 });

    if (wish && wish.items.length > 0) {
      res.render('wish', { wish: wish });
    } else {
      res.render('wish', { wish: null });
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});
app.post('/add-to-wish-dog', async (req, res) => {
  const productId = req.body.productId;
  const userId = req.cookies.id;
  

  try {
    const product = await Product.findById(productId);
    const existingWish = await Wish.findOne({ userId: userId });
    
    if (existingWish) {
      const item = existingWish.items.find(item => item.productId == productId);
      if (item) {
        await Wish.findOneAndUpdate(
  { userId: userId },
  { $set: { 
    'items.$[elem].productId': productId,
    'items.$[elem].title': product.name,
    'items.$[elem].description': product.description,
    'items.$[elem].price': product.price,
    'items.$[elem].image': product.image,
  } },
  { 
    arrayFilters: [{ 'elem.productId': productId }],
    upsert: true 
  }
);

      } else {
        // Add a new product to the cart
        await Wish.findOneAndUpdate(
          { userId: userId },
          { $push: { items: { 
            productId: productId, 
            title: product.name,
            description: product.description,
            price: product.price,
            image:product.image
          } } },
          { upsert: true }
        );
      }
    } else {
      console.log(product.title)
      // Create a new cart with the first product
      const wishData = {
        userId: userId,
        items: [{ 
          productId: productId, 
          title: product.name,
          description: product.description,
          price: product.price,
          image:product.image
        }]
      };
      const newWish = await Wish.create(wishData);
      console.log(newWish);
    }

    res.redirect('/dogs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

app.post('/add-to-wish-cat', async (req, res) => {
  const productId = req.body.productId;
  const userId = req.cookies.id;
  

  try {
    const product = await Product.findById(productId);
    const existingWish = await Wish.findOne({ userId: userId });
    
    if (existingWish) {
      const item = existingWish.items.find(item => item.productId == productId);
      if (item) {
        await Wish.findOneAndUpdate(
  { userId: userId },
  { $set: { 
    'items.$[elem].productId': productId,
    'items.$[elem].title': product.name,
    'items.$[elem].description': product.description,
    'items.$[elem].price': product.price,
    'items.$[elem].image': product.image,
  } },
  { 
    arrayFilters: [{ 'elem.productId': productId }],
    upsert: true 
  }
);

      } else {
        // Add a new product to the cart
        await Wish.findOneAndUpdate(
          { userId: userId },
          { $push: { items: { 
            productId: productId, 
            title: product.name,
            description: product.description,
            price: product.price,
            image:product.image
          } } },
          { upsert: true }
        );
      }
    } else {
      console.log(product.title)
      // Create a new cart with the first product
      const wishData = {
        userId: userId,
        items: [{ 
          productId: productId, 
          title: product.name,
          description: product.description,
          price: product.price,
          image:product.image
        }]
      };
      const newWish = await Wish.create(wishData);
      console.log(newWish);
    }

    res.redirect('/cats');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

app.post('/filter-dog-products', async (req, res) => {
  const filterValue = req.body.filterValue;
  let products;

  if (filterValue === 'below-500') {
    products = await Product.find({ pet_category: 'dog', price: { $lt: 500 } });
  } else if (filterValue === '500-1000') {
    products = await Product.find({ pet_category: 'dog', price: { $gte: 500, $lte: 1000 } });
  } else if (filterValue === 'above-1000') {
    products = await Product.find({ pet_category: 'dog', price: { $gt: 1000 } });
  } else {
    products = await Product.find({ pet_category: 'dog' });
  }

  res.render('dog_products', { products });
});

app.post('/delete-item-wish', async (req, res) => {
  const userId = req.cookies.id;
  const productId = req.body.productId;

  try {
    const wish = await Wish.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { productId: productId } } },
      { new: true }
    );

    if (wish && wish.items.length > 0) {
      res.render('wish', { wish: wish });
    } else {
      res.render('wish', { wish: wish });
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});






app.post('/delete-item', async (req, res) => {
  const userId = req.cookies.id;
  const productId = req.body.productId;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { productId: productId } } },
      { new: true }
    );

    if (cart && cart.items.length > 0) {
      res.render('cart', { cart: cart });
    } else {
      res.render('cart', { cart: null });
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


app.post('/admin/product', urlencodedParser, (req, res) => {
  const { name, description,pet_category,product_category,available,breed,year,gender,weight, price,image } = req.body;
  const product = new Product({
    name,
    description,
    pet_category,
    product_category,
    available,
    breed,
    year,
    gender,
    weight,
    price,
    image
  });
  product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});
app.post('/admin/product/:id', urlencodedParser, (req, res) => {
  const { name, description,available,product_category ,price } = req.body;
  Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    available,
  product_category,
    price
  })
    .then(() => res.redirect('/admin'))
    .catch(err => console.log(err));
});
app.post('/admin/saloon/:id', urlencodedParser, (req, res) => {
  const { saloonTitle, saloonDescription,saloonAddress, saloonLocation, saloonNumber } = req.body;
  Saloon.findByIdAndUpdate(req.params.id, {
    saloonTitle, saloonDescription,saloonAddress, saloonLocation, saloonNumber
  })
    .then(() => res.redirect('/admin/saloon'))
    .catch(err => console.log(err));
});

app.get('/admin/product/:id/edit', (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      res.render('product-edit', { product });
    })
    .catch(err => console.log(err));
});
app.get('/admin/saloon/:id/edit', (req, res) => {
  Saloon.findById(req.params.id)
    .then(saloon => {
      res.render('saloon-edit', { saloon });
    })
    .catch(err => console.log(err));
});
app.get('/admin/product/:id/delete', (req, res) => {
  Product.findByIdAndRemove(req.params.id)
  .then((deletedProduct) => {
    console.log(`Deleted product: ${deletedProduct}`);
    res.redirect('/admin');
  })
  .catch((err) => {
    console.log(`Error deleting product: ${err}`);
    res.redirect('/');
  });

});
app.get('/admin/saloon/:id/delete', (req, res) => {
  Saloon.findByIdAndRemove(req.params.id)
  .then((deletedProduct) => { 
    console.log(`Deleted product: ${deletedProduct}`);
    res.redirect('/admin');
  })
  .catch((err) => {
    console.log(`Error deleting product: ${err}`);
    res.redirect('/');
  });

});
app.get('/food', (req, res) => {
  const cat1='food'
  Product.find({product_category:cat1})
    .then(products_food => {
      res.render('food', { products_food });
    })
    .catch(err => console.log(err));

    
});
app.get('/dogfood', (req, res) => {
  const cat1='food'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/dogpet', (req, res) => {
  const cat1='pet'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_pets', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/catpet', (req, res) => {
  const cat1='pet'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_pets', { products });
    })
    .catch(err => console.log(err));

    
});app.get('/pet', (req, res) => {
  const cat1='pet'
  Product.find({ product_category:cat1})
    .then(products => {
      res.render('pets', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/dogaccess', (req, res) => {
  const cat1='accessories'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_products', { products });
    })
    .catch(err => console.log(err));
});
app.get('/dogbed', (req, res) => {
  const cat1='bed'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/doggrooming', (req, res) => {
  const cat1='grooming'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_products', { products });
    })
    .catch(err => console.log(err));
    
});
app.get('/dogtoy', (req, res) => {
  const cat1='toys'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/dogcloth', (req, res) => {
  const cat1='clothing'
  const cat2='dog'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('dog_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/catfood', (req, res) => {
  const cat1='food'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/cataccess', (req, res) => {
  const cat1='accessories'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_products', { products });
    })
    .catch(err => console.log(err));
});
app.get('/catbed', (req, res) => {
  const cat1='bed'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/catgrooming', (req, res) => {
  const cat1='grooming'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_products', { products });
    })
    .catch(err => console.log(err));
    
});
app.get('/cattoy', (req, res) => {
  const cat1='toys'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_products', { products });
    })
    .catch(err => console.log(err));

    
});
app.get('/catcloth', (req, res) => {
  const cat1='clothing'
  const cat2='cat'
  Product.find({product_category:cat1 , pet_category:cat2})
    .then(products => {
      res.render('cat_products', { products });
    })
    .catch(err => console.log(err));

    
});

app.get('/pet', (req, res) => {
  const cat4='pet'
  Product.find({product_category:cat4})
    .then(products_pet => {
      res.render('pets', { products_pet });
    })
    .catch(err => console.log(err));

    
});
app.get('/grooming', (req, res) => {
  const cat4='grooming'
  Product.find({product_category:cat4})
    .then(products_grooming=> {
      res.render('grooming', { products_grooming });
    })
    .catch(err => console.log(err));

    
});
app.get('/toys', (req, res) => {
  const cat2='toys'
  Product.find({product_category:cat2})
    .then(products_toys => {
      res.render('toys', { products_toys });
    })
    .catch(err => console.log(err));

    
});
app.get('/accessories', (req, res) => {
  const cat3='accessories'
  Product.find({product_category:cat3})
    .then(products => {
      res.render('accessories', { products });
    })
    .catch(err => console.log(err));

    
});

app.get('/clothing', (req, res) => {
  const cat3='clothing'
  Product.find({product_category:cat3})
    .then(products_clothing => {
      res.render('clothing', { products_clothing });
    })
    .catch(err => console.log(err));

    
});
app.get('/bed', (req, res) => {
  const cat3='bed'
  Product.find({product_category:cat3})
    .then(products_bed => {
      res.render('bed', { products_bed });
    })
    .catch(err => console.log(err));

    
});
app.get('/admin', (req, res) => {
  
  Product.find()
    .then(products => {
      res.render('admin', { products });
    })
    .catch(err => console.log(err));
});
//  const number = await Product.countDocuments();
//     const number1 = await User.countDocuments();
// var u1,u2,u3,u4,u5,u6,u7,u8,u9
// User.countDocuments().then(user=>{
//   console.log(user)
//    u1 =user
// })
// Product.countDocuments().then(user=>{
//   console.log(user)
//    u2 =user
// })
// Seller.countDocuments().then(user=>{
//   console.log(user)
//    u3 =user
// })
// Saloon.countDocuments().then(user=>{
//   console.log(user)
//    u4 =user
// })
// Petinfo.countDocuments().then(user=>{
//   console.log(user)
//    u5 =user
// })
// Service.countDocuments().then(user=>{
//   console.log(user)
//    u6 =user
// })
// complaint.countDocuments().then(user=>{
//   console.log(user)
//    u8 =user
// })
// Product.find().then(products=>{
//   let total = 0;
//   products.forEach((product)=>{
//     total += product.price
//   })
//   console.log(total)
//   u7=total
// })
//     app.get('/admin/dashboard',(req,res)=>{

     
      

//     console.log(u1)
//       res.render('admin_dashboard',{u1,u2,u3,u4,u5,u6,u7,u8})
//     })
    app.get('/dogs', async (req, res) => {
      try {
        const products = await Product.find({pet_category:'dog'});
        const cart = await Cart.findOne({ userId: req.cookies.id });
        const cartItems = cart ? cart.items : [];
        res.render('dog_products', { products, cartItems });
      } catch (err) {
        console.log(err);
        res.redirect('/');
      }
    });
    app.get('/cats', async (req, res) => {
      try {
        const products = await Product.find({pet_category:'cat'});
        const cart = await Cart.findOne({ userId: req.cookies.id });
        const cartItems = cart ? cart.items : [];
        res.render('cat_products', { products, cartItems });
      } catch (err) {
        console.log(err);
        res.redirect('/');
      }
    });
    app.get('/previous-orders', async (req, res) => {
      try {
        const orders = await Order.find({ userId: req.cookies.id }).sort({ date: -1 });
        res.render('previous-order', { orders });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });


app.get('/loutcancel',(req,res)=>{
    res.redirect('/main')
})


app.get('/lout',(req,res)=>{
   
    res.redirect('/login')
    id=null
    res.clearCookie.id
    res.clearCookie.username
  })

  

  app.post('/asaloon',(req,res)=>{
    const newsaloon = new Saloon({
      saloonTitle:req.body.saloonTitle,
      saloonDescription:req.body.saloonDescription,
      saloonImage: req.body.saloonImageurl,
      saloonLocation:req.body.saloonLocation,
      saloonAddress:req.body.saloonAddress,
      saloonNumber:req.body.phoneNo
    })
    con.collection('saloons').insertOne(newsaloon)
    res.redirect('/admin/saloon')
  })
  
  app.get('/saloonhyd',(req,res)=>{
    const l = 'Hyderabad'
    
    Saloon.find({'saloonLocation':l}).then(hydsaloons=>{
      res.render('saloon_hyd',{hydsaloons})
    })
  })
  app.get('/saloonmum',(req,res)=>{
    const l = 'Mumbai'
    Saloon.find({'saloonLocation':l}).then(mumsaloons=>{
      res.render('saloon_mum',{mumsaloons})
    })
  })
  app.get('/saloonche',(req,res)=>{
    const l = 'Chennai'
    Saloon.find({'saloonLocation':l}).then(chesaloons=>{
      res.render('saloon_che',{chesaloons})
    })
  })
  app.get('/saloonban',(req,res)=>{
    const l = 'Bangalore'
    Saloon.find({'saloonLocation':l}).then(bansaloons=>{
      res.render('saloon_ban',{bansaloons})
    })
  })
  
  app.get('/saloon',(req,res)=>{
   
    Saloon.find().then(hydsaloons=>{
      res.render('saloon_hyd',{hydsaloons})
    })
  })
  app.get('/admin/saloon',(req,res)=>{
   
    Saloon.find().then(hydsaloons=>{
      res.render('admin_saloon',{hydsaloons})
    })
  })
  app.post('/salserv',(req,res)=>{
    const l = req.cookies.center
   const username= req.cookies.username
    Service.findOne({ 'username': username }).then((l1) => {
      if (!l1) {
        const newservice = new Service({
          username: username,
          service: req.body.service,
          timings: req.body.timeslot,
          center: l
        });
        con.collection('services').insertOne(newservice);
        res.redirect('/paymentsaloon');
      }
      else{
        res.status(500).send('ALREADY YOU HAVE A TICKET')
      }
      
    }).catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
  })
  
  app.post('/hservice',async (req,res)=>{
    res.cookie('center',req.body.hydsaloonname)
    const salon = await Saloon.findOne({"_id":req.body.hydsaloonid})
    res.render('service_center',{salon : salon})
  })
  app.post('/mservice',async (req,res)=>{
    res.cookie('center',req.body.mumsaloonname)
    const salon = await Saloon.findOne({"_id":req.body.mumsaloonid})
    res.render('service_center',{salon})
  })
  
  app.post('/cservice',async (req,res)=>{
    res.cookie('center',req.body.chesaloonname)
    const salon = await Saloon.findOne({"_id":req.body.chesaloonid})
    res.render('service_center',{salon})
  })
  app.post('/bservice',async (req,res)=>{
    res.cookie('center',req.body.bansaloonname)
    const salon = await Saloon.findOne({"_id":req.body.bansaloonid})
    res.render('service_center',{salon})
  })
  
  app.get('/saloonticket',async (req,res)=>{
    const username= req.cookies.username
    const ticket = await Service.findOne({"username":username})
    console.log(ticket)
    res.render('saloon_cnf',{ticket})
  })
  app.get('/admin/service',async (req,res)=>{
    Service.find().then(ticket=>{
      res.render('admin_services',{ticket})
    })
  })
  app.use('/', web)

  app.get('/sellall',(req,res)=>{
    Petinfo.find()
    .then(petinfos => {
      if (petinfos) {
        res.render('sellall', {petinfos})
      }})
  })