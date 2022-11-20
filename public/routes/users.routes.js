const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/users.controller');
const { isRoleValid, emailExist, idExist } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validation');

router.get('/', getUser);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( id => idExist(id) ),
    check('role').custom( role => isRoleValid(role)),
    validateFields
 ], putUser);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({min: 6}),
    check('email', 'Esto no es un correo').isEmail(),
    check('email').custom( email => emailExist(email)),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( role => isRoleValid(role)),
    validateFields
], postUser);
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( id => idExist(id) ),
    validateFields
],deleteUser);
router.patch('/', patchUser);

module.exports = router;