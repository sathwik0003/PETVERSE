import {join} from 'path'
const orderController = (req,res)=>{
    res.render('orders',{'title':'Orders'})
}

export {orderController}