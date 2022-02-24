const UploadModel = require('../schema/schema');
const fs = require("fs")

exports.home = async (request,response) => {
    const imagesDb = await UploadModel.find()
    response.render('main',{images:imagesDb})
}

exports.uploads = (req,res,next) => {
    const files = req.files

    if(!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400;
        return next(error)
    }

     // convert images to base64 encoding
     let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        let finalImg = {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src
        }

        let newUpload = new UploadModel(finalImg);

        return newUpload
                .save()
                .then(() => {
                    return { msg : `${files[index].originalname} Uploaded Successfully...!`}
                })
                .catch(error =>{
                    if(error){
                        if(error.name === 'MongoError' && error.code === 11000){
                            return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
                        }
                        return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
                    }
                })
    })

    Promise.all(result)
        .then( msg => {
            res.redirect('/')
        })
        .catch(err =>{
            res.json(err);
        })
}