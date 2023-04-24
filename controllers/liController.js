import {join} from 'path'
const liController = (req,res)=>{
    res.render('license',{'title':'License Policy'})
}

export {liController}