import {join} from 'path'
const ppController = (req,res)=>{
    res.render('privacy_policy',{'title':'Privacy Policy'})
}

export {ppController}