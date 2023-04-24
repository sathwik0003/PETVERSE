import {join} from 'path'
const sellController = (req,res)=>{
    res.render('sell',{'title':'Sell'})
}

export {sellController}