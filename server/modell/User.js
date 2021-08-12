const mongoose=require('mongoose')
const shema=mongoose.Schema;

const UserShema=new shema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    creatAt:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('users',UserShema);