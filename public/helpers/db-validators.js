const Role = require('../../models/role');
const User = require('../../models/user');

const isRoleValid = async(role = '') => {
    const existsRole = await Role.findOne({role});
    if (!existsRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
}

const emailExist = async(email = '') => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) {
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);    
    }
}

const idExist = async(id) => {
    const existsId = await User.findById(id);
    if (!existsId) {
        throw new Error(`El ID${id} no existe en la base de datos`);
    }
}

module.exports = {
    isRoleValid,
    emailExist,
    idExist
}