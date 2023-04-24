import {join} from 'path'
const paymentcnfController = (req,res)=>{
    res.render('paymentcnf',{'title':'PaymentCnf'})
}

export {paymentcnfController}