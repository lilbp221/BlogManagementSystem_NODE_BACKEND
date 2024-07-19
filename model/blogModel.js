const mongoose =require('mongoose')
const blogSchema= mongoose.Schema({
      blogTitle:{
            type:String
      },
      blogSubtitle:{
            type:String
      },
      blogDescription:{
            type:String
      },
      blogCategory:{
            type:String
      },
      imageUrl:{
            type:String
      }

})

const Blog= mongoose.model("Blog",blogSchema)
module.exports = Blog