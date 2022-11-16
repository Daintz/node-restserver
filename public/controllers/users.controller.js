const { response, request } = require('express');

const getUser = (req = request, res = response) => {

    const { q, nombre='Sin nombre', apikey, page = 1, limit } = req.query;

    res.send({
        msg: 'Desde el get - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
};

const postUser = (req = request, res = response) => {

    const {nombre, edad} = req.body;

    res.send({
        msg: 'Desde el post - controlador',
        nombre,
        edad
    });
};

const putUser = (req = request, res = response) => {

    const { id } = req.params;

    res.send({
        msg: 'Desde el put - controlador',
        id
    });
};

const patchUser = (req = request, res = response) => {
    res.send({
        msg: 'Desde el patch - controlador'
    });
};

const deleteUser = (req = request, res = response) => {
    res.send({
        msg: 'Desde el delete - controlador'
    });
};


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}