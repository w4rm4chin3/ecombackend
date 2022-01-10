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

router.get('', getAllUsers);
router.get('/:id', jwtAuth, getUser);
// router.get('/:id', getUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;