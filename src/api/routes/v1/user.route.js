const express = require('express');
const userController = require('../../controller/user.controller');
const {verifyToken} = require('../../middleware/auth')


const router = express.Router();

router.get('/getuser/:userId', verifyToken.verify, userController.getOneUser);
router.put('/update/:userId', verifyToken.verify, userController.updateUser);
router.get('/getall', userController.getAllUser);
router.delete('/delete', verifyToken.verify, userController.deleteUser);

module.exports = router;
