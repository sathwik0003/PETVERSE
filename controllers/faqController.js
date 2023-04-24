import {join} from 'path'
const faqController = (req,res)=>{
    res.render('faq',{'title':'faq'})
}

export {faqController}