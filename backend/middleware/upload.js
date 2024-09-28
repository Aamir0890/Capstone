const path = require('path');
const multer = require('multer');
const FileRepository = require('../repository/file');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: async (req, file, cb) => {
    try {
      const { originalname } = file;
     
      // Get the file extension
      const fileExtension = path.extname(originalname);
      const baseName = path.basename(originalname, fileExtension); // Get base name without extension

      const originalFile = await FileRepository.getFileByFilename(originalname); // Get the original file by name
       
      let version = 1; // Default version
      if (originalFile) {
        version = originalFile.version + 1; // Increment version if original exists
      }
      
      // Construct the new filename with the version and extension
      const newFileName = `${baseName}-v${version}${fileExtension}`; // e.g., "filename-v2.pdf"
      
      console.log(newFileName);
      cb(null, newFileName);
    } catch (error) {
      cb(new Error('Error while creating file name: ' + error.message));
    }
  }
});

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File type not supported'));
  }
}).single('file'); // 'file' is the name of the input field

module.exports = upload; // Correctly exporting the upload middleware
