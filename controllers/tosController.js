import {join} from 'path'
const tosController = (req,res)=>{
    res.render('tos',{'title':'Terms of Service'})
}

export {tosController}