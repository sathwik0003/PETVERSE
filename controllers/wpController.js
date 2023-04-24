import {join} from 'path'
const wpController = (req,res)=>{
    res.render('whypetverse',{'title':'Why Petverse'})
}

export {wpController}