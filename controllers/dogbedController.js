import {join} from 'path'
const dogbedController = (req,res)=>{
    res.render('dogbed',{'title':'Dog Beds'})
}

export {dogbedController}