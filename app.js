const bcrypt = require('bcryptjs');
const express = require('express')
const app = express()
const port = 5000

app.use(express.json());


let user_details=[
  { id:1 , name:"sahil" , email:"sahil@142gmail.com" , password:1458},
  { id:2 , name:"sadmal" , email:"sadmal@14gmail.com" , password:1457}
]

app.post('/', async (req,res)=>{

  try {
     let {name,email,password}=req.body;
     const secpass= await bcrypt.hash(password,10)

     if(!name || !email || !password){
        return res.send({Error:"please fill all details"})
      }

      for(t of user_details){
        if(t.email==email){
          return res.send({Error:"email already exist"})
        }
      }
      
      let last_id=  user_details[user_details.length-1].id
      user_details.push({id:last_id+1,name,email,password});

      console.log({data:{id:last_id+1,name:name,email:email,password:secpass}})
      let current_user= await user_details[user_details.length-1]
      res.send({message:"user added successfully",
                data:{name:current_user.name,
                      email:current_user.email,
                      password:secpass
                  }
      })

  } catch (error) {
    res.send("something broke!!")
  }
 



})
app.listen(port,()=>{
    console.log("server is running...")
})
