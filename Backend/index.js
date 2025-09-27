const express=require('express')
const app=express()
app.use(express.json())
const {connection}=require('./config.js')
const { User } = require('./Schemas/user.schema.js')

app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.post('/user/add',async(req,res)=>{
try {
    console.log('entered in this endpoint')
const {fullName,mobile,email,pan_card,adhaar_card,credit_card_type,employment_type,monthly_income,date_of_income,agreed_terms}=req.body
if(agreed_terms){
const user=await User.create(req.body) 
console.log(user,'is user')
return res.status(200).json({message:'User added Successfully',data:user})
}else{
    return res.status(400).json({message:'You cant submit until terms and conditions agreed'})
}
} catch (error) {
console.log(error.message)
return res.status(500).json({error:'Something went wrong',err:error.message})
}
})
// Lets fetch
app.get('/user/getData',async(req,res)=>{
    try {
        const allUsers=await User.find()
        console.log(allUsers,'are users till now')
        return res.status(200).json({data:allUsers})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:'Something went wrong',err:error.message})
    }
})
app.delete('/user/delete/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await User.deleteOne({_id:id})
        console.log(deleted)
        return res.status(200).json({message:'Deleted Successfully',deleted})
    } catch (error) {
        return res.status(500).json({error:'Something went wrong and cant delete',err:error.message})
    }
})
app.patch('/user/edit/:id',async(req,res)=>{
    try {
        const {id}=req.params
      const updatedUser= await User.updateOne({_id:id},{$set:req.body})
        return res.status(200).json({message:'Updated Successfully',updatedUser})
    } catch (error) {
        
    }
})
app.listen(8080,async()=>{
    try {
        await connection
        console.log('port 8080 is running now')
        
    } catch (error) {
        console.log(error.message,'is error')
    }
})