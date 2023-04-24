import {join} from 'path'
const mainController = (req,res)=>{
    res.render('main',{'title':'Home'})
}

export {mainController}