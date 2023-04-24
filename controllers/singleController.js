import {join} from 'path'
const singleController = (req,res)=>{
    res.render('singleproduct.ejs',{'title':'Products'})
}

export {singleController}