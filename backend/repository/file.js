const { models: { File } } = require('../models');
const { Op } = require('sequelize'); // Import Sequelize operators


// Create a new file
exports.createFile = async (fileData) => {
    try {
        return await File.create(fileData);
    } catch (error) {
        throw new Error('Error creating file: ' + error.message);
    }
};

// Get all files (optionally filter by folderId)
exports.getAllFiles = async (folderId) => {
    try {
        return await File.findAll({
            where: folderId ? { folderId } : {},
        });
    } catch (error) {
        throw new Error('Error fetching files: ' + error.message);
    }
};

// Get a file by ID
exports.getFileByFilename = async (filename) => {
    try {
        return await File.findOne({
            where: {
                filename: filename,
                isLatest: true // Optionally, check for the latest version
            }
        });
    } catch (error) {
        throw new Error('Error fetching file: ' + error.message);
    }
};


exports.deleteFile = async (fileId) => {
    return await File.destroy({
      where: { id: fileId }
    });
  };

 

// Function to update metadata for a specific file
exports.updateMetadata = async (fileId, metadata) => {
  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    // Update metadata
    file.metadata = {
      ...file.metadata, // Merge with existing metadata
      ...metadata
    };
    await file.save();

    return file;
  } catch (error) {
    throw new Error('Error updating metadata: ' + error.message);
  }
};

// Function to filter files based on metadata
exports.filterFilesByMetadata = async (metadataFilter) => {
  try {
    const files = await File.findAll({
      where: {
        metadata: {
          [Op.contains]: metadataFilter // Use Sequelize's operator to filter JSON
        }
      }
    });

    return files;
  } catch (error) {
    throw new Error('Error filtering files: ' + error.message);
  }
};


exports.updateFile = async (fileName, updateData) => {
    try {
      // Find the latest version of the file
      const file = await File.findOne({
        where: {
          filename: fileName,
          isLatest: true // Check for the latest version
        }
      });
  
      if (!file) {
        throw new Error('File not found');
      }
     console.log('f')
      // Mark the existing file as not the latest
      await file.update({ isLatest: 0 });
      console.log("d")
      // Create a new version based on the updated data
      const newFile = await File.create({
        filename: file.filename, // Use the original filename
        path: file.path, // Use the original path
        size: file.size, // Use the original size
        mimetype: file.mimetype, // Use the original mimetype
        version: file.version + 1, // Increment version
        folderId: file.folderId, // Retain the original folderId
        metadata: { ...file.metadata, ...updateData.metadata }, // Merge existing metadata with new metadata
        isLatest: true, // Mark this new version as the latest
        ...updateData // Include any additional update data
      });
  
      return newFile;
    } catch (error) {
      throw new Error('Error updating file: ' + error.message);
    }
  };
  

  // Get a file by filename and optionally by version
exports.getFileByFilenameAndVersion = async (filename, version = null) => {
  try {
      const whereClause = {
          filename: filename,
      };

      // If a version is provided, add it to the query
      if (version !== null) {
          whereClause.version = version;
      } else {
          whereClause.isLatest = true; // If no version, default to latest
      }

      return await File.findOne({
          where: whereClause
      });
  } catch (error) {
      throw new Error('Error fetching file: ' + error.message);
  }
};
