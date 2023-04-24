import {join} from 'path'
const cattoysController = (req,res)=>{
    res.render('cattoys',{'title':'Cat Toys'})
}

export {cattoysController}