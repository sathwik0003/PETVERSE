import {join} from 'path'
const saloonController = (req,res)=>{
    res.render('saloon',{'title':'Saloon'})
}

export {saloonController}