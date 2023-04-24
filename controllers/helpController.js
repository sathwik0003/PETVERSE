import {join} from 'path'
const helpController = (req,res)=>{
    res.render('help',{'title':'Help'})
}

export {helpController}