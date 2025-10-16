const express=require('express')
const app=express()
app.use(express.json())
const {connection}=require('./config.js')
const { User } = require('./Schemas/user.schema.js')

app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.use((req,res,next)=>{
    console.log(req.method,'is method and url is',req.url)
    next()
})
app.post('/user/add',async(req,res)=>{
try {
    console.log('entered in this endpoint')
// const {fullName,mobile,email,pan_card,adhaar_card,credit_card_type,employment_type,monthly_income,date_of_income,agreed_terms}=req.body
// if(agreed_terms){
const user=await User.insertMany(req.body) 
console.log(user,'is user')
return res.status(200).json({message:'User added Successfully',data:user})

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
app.get('/user/group',async(req,res)=>{
    try {
        console.log('*************')
        const pipeline=[]
        pipeline.push({$match:{
         orderdate:{$gte : new Date('2020-01-01T00:00:00Z'),
            $lt:new Date('2021-01-01T00:00:00Z')
         },

        }})
        pipeline.push({$sort:{
            orderdate:1
        }})
        pipeline.push({$group:{
            _id:"$customer_id",
            first_purchase_date : {$first:'$orderdate'},
            total_value:{$sum:'$value'},
            total_orders:{$count:{}},
            orders:{$push:{
                orderdate:'$orderdate',
                value:'$value'
            }

            }
        }})
        pipeline.push({$sort:{
            first_purchase_date:1
        }})
        pipeline.push({$set:{
            customer_id:'$_id'
        }})
        pipeline.push({$unset:['_id']})
       
       const filteredEngineers= await User.aggregate(pipeline)
       return res.status(201).json({filteredEngineers})
    } catch (error) {
        console.log(error.message,'is error')
        return res.status(501).json({error:error.message})
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
        res.status(501).send({error})
    }
})

app.delete('/user/all',async(req,res)=>{
try {
    console.log('in the delete ************')
   const docs= await User.deleteMany({_id:{$exists:true}})
   console.log(docs,'are docs')
    return res.status(200).json({docs})
} catch (error) {
    console.log(error.message,'is error')
    return res.status(500).json({error:error.message})
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