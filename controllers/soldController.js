import {join} from 'path'
const soldController = (req,res)=>{
    res.render('sold.ejs',{'title':'CheckSell'})
}

export {soldController}