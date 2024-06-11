// const mongoose=require("mongoose")

// const employeeSchema = new mongoose.Schema({
//     name: String,
//     position: String,
//     department: String,
//     salary: Number,
//   });
  
//   const Employee = mongoose.model("Employee", employeeSchema);
  const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    position:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    }
})

const UserModel=mongoose.model("employees",UserSchema)
module.exports=UserModel