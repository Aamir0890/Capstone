// fileService.js
const FileRepository = require('../repository/file'); // Ensure this is correctly pointing to your repository
require('dotenv').config();

// Upload file service
exports.uploadFile = async (userId, folderId, file, metadata) => {
  const fileData = {
    filename: file.originalname,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
    folderId: folderId, // Use the folderId passed in
    metadata: metadata || {}, // Use the metadata if provided
  };

  // Call the repository's createFile method
  return await FileRepository.createFile(fileData);
};


exports.listFiles = async (userId, folderId) => {
    try {
        // Optionally, you might want to include user validation logic here
        // e.g., check if the user has access to the folder
           

        // Call the repository's getAllFiles method with the folderId
        const files = await FileRepository.getAllFiles(folderId);
        return files; // Return the list of files
    } catch (error) {
        throw new Error('Error fetching files: ' + error.message);
    }
};

exports.downloadFile = async (fileName) => {
    try {
        // Get the file record from the repository
        const file = await FileRepository.getFileByFilename(fileName);
          
        // Ensure the file exists
        if (!file) {
          throw new Error('File not found');
        }

      
        return {
            id: file.id,
            filename: file.filename,
            mimetype: file.mimetype,
            path: file.path, // This is used to locate the file on the filesystem
            size: file.size,
            folderId: file.folderId,
           
        };
    } catch (error) {
        throw new Error('Error downloading file: ' + error.message);
    }
};

const fs = require('fs').promises;
const path = require('path');

exports.deleteFiles = async (fileId) => {
  try {
    // Retrieve the file information from the repository
    const file = await FileRepository.getFileById(fileId);

    if (!file) {
      throw new Error('File not found');
    }

    const filePath = path.join(process.env.STORAGE_PATH, file.path); // Construct the file path
    // Delete the file from the filesystem
    await fs.unlink(filePath);

    // Delete the file record from the database
    await FileRepository.deleteFile(fileId);

    return { message: 'File deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting file: ' + error.message);
  }
};


// Service function to update metadata for a specific file
exports.updateMetadata = async (fileId, metadata) => {
  try {
    const updatedFile = await FileRepository.updateMetadata(fileId, metadata);
    return updatedFile;
  } catch (error) {
    throw new Error('Error in updating metadata: ' + error.message);
  }
};

// Service function to filter files based on metadata
exports.filterFilesByMetadata = async (metadataFilter) => {
  try {
    const files = await FileRepository.filterFilesByMetadata(metadataFilter);
    return files;
  } catch (error) {
    throw new Error('Error in filtering files: ' + error.message);
  }
};

exports.uploadNewVersion = async (fileData) => {
  // Get the original file if it exists
  const originalFile = await FileRepository.getFileByFilename(fileData.filename);
    
  // Prepare the update data for the new version
  const updateData = {
    path: fileData.path,
    size: fileData.size,
    mimetype: fileData.mimetype,
    folderId: fileData.folderId,
    metadata: fileData.metadata,
    isLatest: true // Mark this version as the latest
  };
  
  // Create a new version of the file
  const newVersion = await FileRepository.updateFile(fileData.filename, updateData); // Pass filename and updateData separately
  
  return newVersion;
};

exports.downloadVersionFile = async (fileName, version = null) => {
  // Fetch the file based on its filename and version (or latest)
  const fileData = await FileRepository.getFileByFilenameAndVersion(fileName, version);
  return fileData;
};
