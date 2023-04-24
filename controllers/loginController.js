import {join} from 'path'
const loginController = (req,res)=>{
    res.render('login',{'title':'Login'})
}

export {loginController}