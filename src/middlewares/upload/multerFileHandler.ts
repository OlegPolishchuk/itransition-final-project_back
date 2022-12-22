import Multer from "multer";

export class MulterFileHandler{
  static getInstance = () => {
    const multer = Multer({
      storage: Multer.diskStorage({
        destination: function(req, file, callback){
          callback(null, `${__dirname}`)
        },
        filename: function(req, file, callback){
          callback(null, file.originalname)
        }
      })
    })

    return multer;
  }
}