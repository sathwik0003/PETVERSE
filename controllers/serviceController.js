import {join} from 'path'
const serviceController = (req,res)=>{
    res.render('service_center',{'title':'Services'})
}

export {serviceController}