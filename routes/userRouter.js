const express = require('express');
const router = express.Router();
const {
    updateUser,
    deleteUser,
    getAllUsers,
    getUser,
} = require('../controllers/userController');
require('../middlewares/passport');
const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', { session: false });

// router.post('/update/:id', jwtAuth, updateUser);
// router.post('/delete/:id', jwtAuth, deleteUser);
router.get('/', getAllUsers);
router.get('/:id', jwtAuth, getUser);

module.exports = router;