import {join} from 'path'
const paymentController = (req,res)=>{
    res.render('payment',{'title':'Payment'})
}

export {paymentController}