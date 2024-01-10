import multer from "multer";
import path from "path";

const maxSize = 5242880 // a peux pres 5 MO

const storageEngine = multer.diskStorage({
    destination: "./public/assets/img",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`);
        
    }
})

const upload = multer({
    storage: storageEngine, 
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) =>{
        checkFileType(file, cb)
    }
})

const checkFileType = (file, cb) => {
    //Autorisation des fichiers img
    const fileTypes = /jpg|png|jpeg|gif|webp|svg/

    // Vérification des extentions de fichiers
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if(extName && mimeType){
        return cb(null, true)
    }else {
        cb("Not good format")
    }
}

export default upload