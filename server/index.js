require('dotenv').config();
const express =require('express');
const mongoose =require(`mongoose`);
const auth=require('./router/auth');
const post=require('./router/Post');
const cors=require('cors');

const ConnectDB=async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.52dhe.mongodb.net/Mern_Learnit?retryWrites=true&w=majority`,{
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true
        })
        console.log("Connect success")
    } catch (error) {
        console.log("Connect Fail"+error);
    }
}

const app=express();
ConnectDB()
//app.get('/',(req,res) => res.send("Pham Trong Truong"));
app.use(express.json())
app.use(cors());
app.use('/api/post',post);
app.use('/api/auth',auth);


const PORT=process.env.PORT ||5656;
app.listen(PORT ,()=>(console.log(`Server started on port ${PORT}`)))