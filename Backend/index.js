const express = require('express')
const multer = require('multer')
const cors = require('cors')
const docxToPDF = require('docx-pdf');
const path =require('path')



const app = express()
const PORT = 3000

app.use(cors())
//Just copy paste the code below to from multer documentation..
//Here we just setting stroage and destination for the file to be stored  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  //route.
  app.post("/convertFile", upload.single("file"), (req, res, next)=>{
        try{
            if(!req.file){
                return res.status(400).json({
                    status: false,
                    message: "Attach the file then try to upload the file!"
                })
                
            }
            //define output file path.
            let outputPath = path.join(__dirname, 'files', `${req.file.originalname}.pdf`)
            docxToPDF(req.file.path,outputPath,(err,result)=>{
                if(err){
                  console.log(err);
                  return res.status(400).json({
                    message: "Error converting file docx to pdf!"
                  });
                }
                res.download(outputPath, (err)=>{
                  if(err){
                    return res.status(400).json({
                      message: "Error downloading file!"
                    });
                  }
                  console.log('File downloaded successfully!');
                });
                
              });
            
        }catch(err){
            console.log(err)
            return res.status(500).json({
                status: false,
                message: "Internal Server Error!"
            })
        }
  })





// app.get("/", (req, res)=>{
//     res.send(`<h1> What's up! N </h1>`)
// })

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});