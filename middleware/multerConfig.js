const multer=require('multer') //multer is a node js middleware package for handing files in DB Operatioins
const storage= multer.diskStorage({
      // destination:
      // filename:
      destination: function(req,file,cb){
            // const allowedType=['image/png', 'image/jpeg', 'image/jpg']
            // if(!allowedType.includes(file.mimetype)){
            //       cb(new Error('Invalid file type'))
            // }
            // else{
                  cb(null,"./storage") //cb(ERROR,SUCCESS)

            // }
      },
      filename: function(req,file,cb){
            cb(null,Date.now()+"_"+file.originalname)
      }

})

const upload= multer({storage:storage,
      limits:{fileSize:1024*1024},
      fileFilter: function(req, file, cb) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.mimetype)) {
              cb(new Error('Invalid file type'));
            } else {
              cb(null, true);
            }
            // console.log(Error) //MulterError: File too large //when i sent file above 5 mb
          }
})

module.exports={storage,multer,upload}


//storage gives where to store files and what name to store them