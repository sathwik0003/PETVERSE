import {join} from 'path'
const doggroomingController = (req,res)=>{
    res.render('doggrooming',{'title':'Dog Grooming'})
}

export {doggroomingController}