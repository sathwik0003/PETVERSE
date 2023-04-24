import {join} from 'path'
const dogaccessoriesController = (req,res)=>{
    res.render('dogaccessories',{'title':'Dog Accessories'})
}

export {dogaccessoriesController}