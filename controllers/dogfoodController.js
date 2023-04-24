import {join} from 'path'
const dogfoodController = (req,res)=>{
    res.render('dogfood',{'title':'Dog Food'})
}

export {dogfoodController}