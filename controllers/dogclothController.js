import {join} from 'path'
const dogclothController = (req,res)=>{
    res.render('dogcloth',{'title':'Dog Clothes'})
}

export {dogclothController}