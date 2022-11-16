const { Router } = require('express');
const router = Router();
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/users.controller');

router.get('/', getUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/', deleteUser);
router.patch('/', patchUser);

module.exports = router;