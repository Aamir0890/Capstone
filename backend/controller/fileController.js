const fileService = require('../services/file');
const fileSchema = require('../utils/validation/fileSchema');
const ErrorHandler = require('../utils/errors/errorHandler');
const SuccessHandler = require('../utils/errors/successHandler');
const upload = require('../middleware/upload'); // Assuming this is your multer middleware
require('dotenv').config();

// File Upload
exports.uploadFile = [
  upload, 
  async (req, res) => {
    try {
      // Validate the incoming file data using Zod
  
      const result = fileSchema.safeParse({
        folderId: parseInt(req.body.folderId), 
        file: {
          filename: req.file.originalname,
          path: req.file.path,
          size:req.file.size,
          mimetype: req.file.mimetype,
        },
        metadata: req.body.metadata ? JSON.parse(req.body.metadata) : undefined,
      });
          
     
      if (!result.success) {
       
        const errors = result.error.errors.map(err => err.message);
        
        return ErrorHandler.validationError(res, errors);
      }

      // Parse metadata if provided
      let metadata;
      try {
        metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
      } catch (error) {
        return ErrorHandler.validationError(res, ['Invalid metadata format']);
      }

      // Prepare file data
      const fileData = {
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        folderId: req.body.folderId,
        metadata,
        userId: req.user.id // Include userId from authenticated user
      };

      // Upload the file using the file service
      const file = await fileService.uploadFile(req.user.id, fileData.folderId, req.file, metadata);

      return SuccessHandler.created(res, file, 'File uploaded successfully');
    } catch (error) {
      console.error(error);
      return ErrorHandler.internalServerError(res, error.message);
    }
  }
];

// List Files
exports.listFiles = async (req, res) => {
  try {
    const { folderId } = req.params;
    const files = await fileService.listFiles(req.user.id, folderId);
    return SuccessHandler.ok(res, files, 'Files retrieved successfully');
  } catch (error) {
    console.error(error);
    return ErrorHandler.internalServerError(res, error.message);
  }
};

const path = require('path');
const fs = require('fs').promises; // Use the promises version of fs

exports.downloadFile = async (req, res) => {
  try {
    const { fileName } = req.params;
   
    // Call the service to get file information
    const fileData = await fileService.downloadFile(fileName);
    
    if (!fileData) {
      return ErrorHandler.notFoundError(res, 'File not found');
    }
    
    // Set appropriate headers for file download
    res.setHeader('Content-Type', fileData.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${fileData.filename}"`);
    
    // Send the file from the filesystem
    const filePath = path.join(process.env.STORAGE_PATH, fileData.path); // Construct the file path
    const fileContent = await fs.readFile(filePath); // Read the file from the filesystem

    // Send the file content
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    if (error.code === 'ENOENT') {
      return ErrorHandler.notFoundError(res, 'File not found on the server');
    }
    return ErrorHandler.internalServerError(res, error.message);
  }
};


// Update File Metadata
exports.updateFileMetadata = async (req, res) => {
  try {
    const { fileId } = req.params;
    const result = fileSchema.metadata.safeParse(req.body);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => err.message);
      return ErrorHandler.validationError(res, errors);
    }

    const updatedFile = await fileService.updateFileMetadata(fileId, req.body);
    return SuccessHandler.ok(res, updatedFile, 'File metadata updated successfully');
  } catch (error) {
    console.error(error);
    return ErrorHandler.internalServerError(res, error.message);
  }
};

// Delete File
exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    await fileService.deleteFiles(fileId);
    return SuccessHandler.ok(res, null, 'File deleted successfully');
  } catch (error) {
    console.error(error);
    return ErrorHandler.internalServerError(res, error.message);
  }
};



// Controller function to handle adding metadata to a file
exports.addMetadata = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { metadata } = req.body;

    const updatedFile = await fileService.updateMetadata(fileId, metadata);
    return SuccessHandler.ok(res, updatedFile, 'Metadata added successfully');
  } catch (error) {
    console.error(error);
    return ErrorHandler.internalServerError(res, error.message);
  }
};

// Controller function to handle filtering files by metadata
exports.filterFiles = async (req, res) => {
  try {
    const { metadataFilter } = req.body;

    const files = await fileService.filterFilesByMetadata(metadataFilter);
    return SuccessHandler.ok(res, files, 'Files filtered successfully');
  } catch (error) {
    console.error(error);
    return ErrorHandler.internalServerError(res, error.message);
  }
};

// Controller function to handle uploading a new version of a file
exports.uploadNewVersion = [ upload, async (req, res) => {
    try {
      // Validate the incoming file data using Zod or similar validation
      const result = fileSchema.safeParse({
        folderId: parseInt(req.body.folderId),
        file: {
          filename: req.file.originalname,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
        metadata: req.body.metadata ? JSON.parse(req.body.metadata) : undefined,
      });
      
      if (!result.success) {
        const errors = result.error.errors.map((err) => err.message);
        return ErrorHandler.validationError(res, errors);
      }
      
      // Parse metadata if provided
      let metadata;
      try {
        metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
      } catch (error) {
        return ErrorHandler.validationError(res, ['Invalid metadata format']);
      }
  
      // Prepare file data
      const fileData = {
        filename: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        folderId: req.body.folderId,
        metadata,
      }; 
     console.log(fileData)
      // Upload the new version using the file service
      const newVersion = await fileService.uploadNewVersion(fileData);
  
      return SuccessHandler.created(res, newVersion, 'New version uploaded successfully');
    } catch (error) {
      console.error(error);
      return ErrorHandler.internalServerError(res, error.message);
    }
  }]
  


// Download a specific version of a file
exports.downloadVersionFile = async (req, res) => {
  try {
    const { fileName, version } = req.params; // Accept both filename and version
    
    // Call the service to get file information
    const fileData = await fileService.downloadVersionFile(fileName, version); // Pass version to the service
    
    if (!fileData) {
      return ErrorHandler.notFoundError(res, 'File not found');
    }
    
    // Set appropriate headers for file download
    res.setHeader('Content-Type', fileData.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${fileData.filename}"`);
    
    // Send the file from the filesystem
    const filePath = path.join(process.env.STORAGE_PATH, fileData.path); // Construct the file path
    const fileContent = await fs.readFile(filePath); // Read the file from the filesystem

    // Send the file content
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    if (error.code === 'ENOENT') {
      return ErrorHandler.internalServerError(res, 'File not found on the server');
    }
    return ErrorHandler.internalServerError(res, error.message);
  }
};

