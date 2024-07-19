const mongoose= require('mongoose');
const connectionString= "mongodb+srv://pokhrelbinod15:binod123@bms.nsgv62n.mongodb.net/?retryWrites=true&w=majority&appName=BMS"

const connectToDatabase= async function(){
      await mongoose.connect(connectionString)
      console.log("Database connection established!")
}

module.exports=connectToDatabase