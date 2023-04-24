import {join} from 'path'
const dogproController = (req,res)=>{
    res.render('dog_products',{'title':'Dog Products'})
}

export {dogproController}