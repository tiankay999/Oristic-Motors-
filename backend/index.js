const express = require('express');
const app = express();
const{sequelize}= require('./config/database');
app.use(express.json()); 
const User= require('./models/user');
const Admin= require('./models/admin');
const Order = require('./models/order');









sequelize.sync()
.then(()=>{
    console.log('Database & tables created!');
});




app.get('/health', (req, res) => {
    res.status(200).json({message: 'OK'});
});


app.post("/signup", async(req,res)=>{
 
    try{
        const {name,email,password,phone}= req.body;
       if (!name || !email || !password|| !phone ){
        res.status(401).json({message:"All the Credentials are Required"})
       }
    
    const Account= await User.create({name,password,email,phone})
     if (Account){
        res.status(201).json({message:"User Created Successfully,",Account})
     }else{
        res.status(401).json({message:"User Not Created"})
     }



    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }

    
});



app.post("/login", async(req,res)=>{
    try{
        const {email,password}= req.body;
        if (!email || !password){
            res.status(401).json({message:"All the Credentials are Required"})
        }
        const user=await User.findOne({where:{email:email,password:password}})
        if (user){
            res.status(200).json({message:"User Logged In Successfully"})
        }else{
            res.status(401).json({message:"User Not Found"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
})



app.post("/create-admin", async(req,res)=>{
    try{
        const {name,password,email}= req.body;
        if (!name || !password || !email){
            res.status(401).json({message:"All the Credentials are Required"})
        }
        const admin=await Admin.create({name,password,email})
        if (admin){
            res.status(201).json({message:"Admin Created Successfully",admin})
        }else{
            res.status(401).json({message:"Admin Not Created"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
})

app.post('/admin-login', async(req,res)=>{
    try{
        const {name,password}= req.body;
        if (!name || !password){
            res.status(401).json({message:"All the Credentials are Required"})
        }
        const admin= await Admin.findOne({where:{name:name,password:password}})
        if (admin){
            res.status(200).json({message:"Admin Logged In Successfully",admin})
        }else{
            res.status(401).json({message:"Admin Not Found"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
});``

app.post('/orders',async(req,res)=>{
 try{
        const {firstName,lastName,email,phone,address,totalAmount}= req.body;
        if (!firstName || !lastName || !email || !phone || !address || !totalAmount){
            res.status(401).json({message:"All the Credentials are Required"})
        }
        const order=await Order.create({firstName,lastName,email,phone,address,totalAmount})
        if (order){
            res.status(201).json({message:"Order Created Successfully",order})
        }else{
            res.status(401).json({message:"Order Not Created"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
})










































































































































































const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    sequelize.sync()
        .then(() => {
            console.log('Database & tables created!');
        })
        .catch(err => console.log("DB Sync Error:", err));
});