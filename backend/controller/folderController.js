const folderService = require('../services/folder');
const  folderSchema  = require('../utils/validation/folderSchema'); 
const ErrorHandler = require('../utils/errors/errorHandler');
const SuccessHandler = require('../utils/errors/successHandler');

// Create Folder
exports.createFolder = async (req, res) => {
    try {
        // Validate the incoming folder data using Zod
        const result = folderSchema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.errors.map(err => err.message);
            return ErrorHandler.validationError(res, errors);
        }
        
        // Add userId from authenticated user
        const folderData = {
            ...req.body,         // Spread the rest of the folder data (like folder name)
            userId: req.user.id  // Include userId from req.user
        };

        // Create the folder with the folderData (including userId)
        const folder = await folderService.createFolder(folderData);

        return SuccessHandler.created(res, folder, 'Folder created successfully');
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res, error.message);
    }
};


// Get Folder by ID
exports.getFolderById = async (req, res) => {
    try {
        const id = req.params.id;
        const folder = await folderService.getFolderById(id);

        if (!folder) {
            return ErrorHandler.notFound(res, 'Folder not found');
        }

        return SuccessHandler.success(res, folder, 'Folder retrieved successfully');
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res, error.message);
    }
};

// Update Folder by ID
exports.updateFolder = async (req, res) => {
    try {
        const id = req.params.id;
        const result = folderSchema.partial().safeParse(req.body);  // Assuming partial update

        if (!result.success) {
            const errors = result.error.errors.map(err => err.message);
            return ErrorHandler.validationError(res, errors);
        }

        const updatedFolder = await folderService.updateFolder(id, req.body);
        if (!updatedFolder) {
            return ErrorHandler.notFound(res, 'Folder not found');
        }

        return SuccessHandler.success(res, updatedFolder, 'Folder updated successfully');
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res, error.message);
    }
};

// Delete Folder by ID
exports.deleteFolder = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFolder = await folderService.deleteFolder(id);

        if (!deletedFolder) {
            return ErrorHandler.notFound(res, 'Folder not found');
        }

        return SuccessHandler.noContent(res);
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res, error.message);
    }
};

// Get All Folders
exports.getAllFolders = async (req, res) => {
    try {
        const folders = await folderService.getAllFolders();
        return SuccessHandler.success(res, folders, 'Folders retrieved successfully');
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res, error.message);
    }
};
