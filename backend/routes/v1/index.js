const userController=require('../../controller/userController')
const folderController=require('../../controller/folderController')
const fileController=require('../../controller/fileController')
const authenticate=require('../../middleware/authentication')
const express=require('express')
const router=express.Router();

router.post('/user/login',userController.loginUser)
router.post('/user/register',userController.createUser)
router.use(authenticate)
router.get('/user',userController.getUserById)
router.put('/user',userController.updateUser)
router.delete('/user',userController.deleteUser)

//folder
router.get('/folder/:id', folderController.getFolderById);
router.post('/folder', folderController.createFolder);
router.put('/folder/:id', folderController.updateFolder);
router.delete('/folder/:id', folderController.deleteFolder);
router.get('/folders', folderController.getAllFolders);
//file
router.post('/upload',fileController.uploadFile)
router.get('/getFiles/:folderId',fileController.listFiles)
router.get('/download/:fileId',fileController.downloadFile)
router.delete('/deleteFile/:fileId',fileController.deleteFile)


//metadata
router.post('/addMetadata',fileController.updateFileMetadata)
router.get('/getFilebyFilter',fileController.filterFiles)

//versioning of file
router.post('/uploadNewVersion',fileController.uploadNewVersion)
router.get('/download/:fileName/:version', fileController.downloadVersionFile);


module.exports=router

