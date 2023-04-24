import express from 'express'
const router =express.Router()
import {mainController} from '../controllers/mainController.js'
import {loginController} from '../controllers/loginController.js'
import {sellController} from '../controllers/sellController.js'

import {dogproController} from '../controllers/dogproController.js'
import {catproController} from '../controllers/catproController.js'
import {saloonController} from '../controllers/saloonController.js'
import {catbreedsController} from '../controllers/catbreedsController.js'
import {dogbreedsController} from '../controllers/dogbreedsController.js'
import {faqController} from '../controllers/faqController.js'
import {kauController} from '../controllers/kauController.js'
import {liController} from '../controllers/liController.js'
import {ppController} from '../controllers/ppController.js'
import {wpController} from '../controllers/wpController.js'
import {helpController} from '../controllers/helpController.js'
import {dogfoodController} from '../controllers/dogfoodController.js'
import {dogclothController} from '../controllers/dogclothController.js'
import {dogbedController} from '../controllers/dogbedController.js'
import {dogaccessoriesController} from '../controllers/dogaccessoriesController.js'
import {dogtoysController} from '../controllers/dogtoysController.js'
import {doggroomingController} from '../controllers/doggroomingController.js'
import {catfoodController} from '../controllers/catfoodController.js'
import {catclothController} from '../controllers/catclothController.js'
import {catbedController} from '../controllers/catbedController.js'
import {cataccessoriesController} from '../controllers/cataccessoriesController.js'
import {cattoysController} from '../controllers/cattoysController.js'
import {catgroomingController} from '../controllers/catgroomingController.js'
import {mainafterController} from '../controllers/mainafterController.js'
import {accountController} from '../controllers/accountController.js'
import {wishController} from '../controllers/wishController.js'
import {cartController} from '../controllers/cartController.js'
import {paymentController} from '../controllers/paymentController.js'
import {paymentcnfController} from '../controllers/paymentcnfController.js'
import {serviceController} from '../controllers/serviceController.js'
import {orderController} from '../controllers/orderController.js'
import {singleController} from '../controllers/singleController.js'
// import { soldController } from '../controllers/soldController.js'
import { signupController } from '../controllers/signupController.js'
import { apController } from '../controllers/apController.js'
router.get('/',mainController)
router.get('/login',loginController)
router.get('/sell',sellController)

// router.get('/dogs',dogproController)
router.get('/cats',catproController)
router.get('/saloon',saloonController)
router.get('/catbreeds',catbreedsController)
router.get('/dogbreeds',dogbreedsController)
router.get('/faq',faqController)
router.get('/help',helpController)
router.get('/kau',kauController)
router.get('/license',liController)
router.get('/privacy_policy',ppController)
router.get('/whypetverse',wpController)
router.get('/dogcloth',dogclothController)
router.get('/dogfood',dogfoodController)
router.get('/dogbed',dogbedController)
router.get('/dogaccessories',dogaccessoriesController)
router.get('/dogtoys',dogtoysController)
router.get('/doggrooming',doggroomingController)
router.get('/catcloth',catclothController)
router.get('/catfood',catfoodController)
router.get('/catbed',catbedController)
router.get('/cataccessories',cataccessoriesController)
router.get('/cattoys',cattoysController)
router.get('/catgrooming',catgroomingController)
router.get('/main',mainafterController)
// router.get('/account',accountController)
router.get('/wishlist',wishController)
router.get('/cart',cartController)
router.get('/payment',paymentController)
router.get('/paymentcnf',paymentcnfController)
router.get('/service',serviceController)
/
router.get('/orders',orderController)
router.get('/single',singleController)
// router.get('/checksell',soldController)
router.get('/signup',signupController)
router.get('/ap',apController)

export default router