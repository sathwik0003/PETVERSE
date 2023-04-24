import {join} from 'path'
const dogbreedsController = (req,res)=>{
    res.render('dogbreeds',{'title':'Dog Breeds'})
}

export {dogbreedsController}