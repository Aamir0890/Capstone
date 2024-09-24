const folderRepository = require('../repository/folder'); // Adjust the path based on your structure

// Create Folder
exports.createFolder = async (folderData) => {
    return await folderRepository.createFolder(folderData);
};

// Update Folder by ID
exports.updateFolder = async (id, data) => {
    return await folderRepository.updateFolder(id, data);
};

// Get Folder by ID
exports.getFolderById = async (id) => {
    return await folderRepository.getFolderById(id);
};

// Delete Folder by ID
exports.deleteFolder = async (id) => {
    return await folderRepository.deleteFolder(id);
};

// Get all folders
exports.getAllFolders = async () => {
    return await folderRepository.getAllFolders();
};
