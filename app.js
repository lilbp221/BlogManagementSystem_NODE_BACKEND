const express= require('express');
const connectToDatabase = require('./database/indexDB');
const Blog = require('./model/blogModel');
const {multer,storage,upload} =require('./middleware/multerConfig')
const fs=require('fs');
const app=express();

app.use(express.json()) //to parse json from frontend to backend while sending data with post method
connectToDatabase()

// const upload= multer({storage:storage})
app.listen('3000',function(){
      console.log("http://localhost:3000") //dont give slash here
})

app.use(express.static('./storage/'))
//in order to give access to the browser for browsing code file of node js ./storage
//gives only access to this file not any others

app.get('/',function(req,res){
      res.send("Hello from backend")
})

//create API for creating new blog
app.post('/blog',upload.single('image'),async function(req,res){ //async function because DB req is asynchronous

let fileName;
if(req.file){
      fileName="http://localhost:3000/"+req.file.filename

}
else{
      fileName:"https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg"
}

const {blogTitle,blogSubtitle,blogDescription,blogCategory}=req.body //temporarily holdes FE data in req.body
await Blog.create({
      blogTitle,
      blogSubtitle,
      blogDescription,
      blogCategory,
      imageUrl:fileName
})
res.status(201).json({
      message:"Blog created successfully",
})
})

//retrieve API for all BLOGS

app.get('/blog',async function(req, res){
      const blogs= await Blog.find()
res.status(200).json({
      message:"Blog Retrieved successfully",
      data:blogs
})
})

//retrieve API for single blog

app.get('/blog/:id',async function(req,res){
      const {id}=req.params
      // console.log(id)
      const blog= await Blog.findById(id) //returns object{      //  _id: new ObjectId('669a6f359dfe538121500499'),
      res.status(200).json({
            message:"Single Blog retrieved successfully",
            data:blog
      })                                                                  //       blogTitle: 'Hello',
})                                                                       //       blogSubtitle: 'Hi',
                                                                        //       blogDescription: 'desc',
                                                                        //       blogCategory: ' cat',
                                                                        //       __v: 0
                                                                        //     }
                                                                 
      


//delete API for blog delete

app.delete('/blog/:id',async function(req,res){
      const {id}= req.params
      const oldDatas= await Blog.findById(id)
      const imageUrl=oldDatas.imageUrl  //http://localhost:3000/1721400246899_Screenshot 2024-07-13 at 1.14.13 PM
      console.log(imageUrl)
      const localHostUrlLength="http://localhost:3000/".length //21
      const newimageUrl=imageUrl.slice(localHostUrlLength) //1721400246899_Screenshot 2024-07-13 at 1.14.13 PM.png
      console.log(newimageUrl)
      fs.unlink("./storage/"+newimageUrl,(err)=>{
            if(err){console.log(err)}
            else{console.log("image deleted successfully")}
      })

      // await Blog.findByIdAndDelete(id)
      res.status(200).json({
            message:"Blog deleted successfully",
      })

})

//update API for Blog

app.patch('/blog/:id',upload.single('image'),async function(req, res){
const {id}= req.params
// console.log(id)
let fileName;

if(req.file)
      {
const oldDatas= await Blog.findById(id)
const imageUrl=oldDatas.imageUrl  //http://localhost:3000/1721400246899_Screenshot 2024-07-13 at 1.14.13 PM
// console.log(imageUrl)
const localHostUrlLength="http://localhost:3000/".length //21
const newimageUrl=imageUrl.slice(localHostUrlLength) //1721400246899_Screenshot 2024-07-13 at 1.14.13 PM.png
// console.log(newimageUrl)
fs.unlink("./storage/"+newimageUrl,(err)=>{
if(err){
console.log(err)
      }
else{
console.log("image deleted successfully")
      }
                                    })
fileName="http://localhost:3000"+req.file.filename                                   
      }








const {blogTitle,blogSubtitle,blogDescription,blogCategory}=req.body
// console.log(req.body)

await Blog.findByIdAndUpdate(id,{
      blogTitle:blogTitle,
      blogSubtitle,
      blogDescription,
      blogCategory,
      imageUrl:fileName
})

res.status(200).json({
      message:"Blog updated successfully",
})
})