import {join} from 'path'
const wishController = (req,res)=>{
    res.render('wishlist',{'title':'WishList'})
}

export {wishController}