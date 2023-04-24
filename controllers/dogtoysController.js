import {join} from 'path'
const dogtoysController = (req,res)=>{
    res.render('dogtoys',{'title':'Dog Toys'})
}

export {dogtoysController}