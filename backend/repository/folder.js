const { models: { Folder } } = require('../models');

// Create a new folder
exports.createFolder = async (folderData) => {
    try {
        return await Folder.create(folderData);
    } catch (error) {
        throw new Error('Error creating folder: ' + error.message);
    }
};

// Get all folders
exports.getAllFolders = async () => {
    try {
        return await Folder.findAll();
    } catch (error) {
        throw new Error('Error fetching folders: ' + error.message);
    }
};

// Get a folder by ID
exports.getFolderById = async (folderId) => {
    try {
        return await Folder.findByPk(folderId);
    } catch (error) {
        throw new Error('Error fetching folder: ' + error.message);
    }
};

// Update a folder by ID
exports.updateFolder = async (folderId, updateData) => {
    try {
        const folder = await Folder.findByPk(folderId);
        if (!folder) {
            throw new Error('Folder not found');
        }
        return await folder.update(updateData);
    } catch (error) {
        throw new Error('Error updating folder: ' + error.message);
    }
};

// Delete a folder by ID
exports.deleteFolder = async (folderId) => {
    try {
        const folder = await Folder.findByPk(folderId);
        if (!folder) {
            throw new Error('Folder not found');
        }
        await folder.destroy();
        return { message: 'Folder deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting folder: ' + error.message);
    }
};
