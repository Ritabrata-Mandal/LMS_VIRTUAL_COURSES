import multer from 'multer'

//multer is middleware used in Express.js to handle file uploads


//cb means callback
//Storage Configuration
//Save uploaded files on the server's disk.

// req → request object
// file → uploaded file information
// cb → callback function

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , "./public");
        // No error (null)
        // Save the file inside the public folder
    },

    //This decides what name the file will have after being saved.
    filename:(req,file,cb)=>{
        cb(null , file.originalname);
    },

})

//Creates a Multer middleware using the storage rules above.
const upload = multer({storage});

export default upload;