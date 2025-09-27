const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    mobile:{type:String,required:true},
    email:{type:String,unique:true,required:[true,'Email must be entered']},
    pan_card:{type:String,required:true},
    adhaar_card:{type:String,required:true},
    credit_card_type:{type:String,required:true},//Either visa or mastercard,
    employment_type:{type:String,required:true},//salaried,self_emp
    monthly_income:{type:Number,required:true},
    date_of_income:{type:Date,default:Date.now()},
    agreed_terms:{type:Boolean,default:false}
})
const User=mongoose.model('User',userSchema)
module.exports={User}