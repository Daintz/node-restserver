const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../../models/user');

const getUser = async(req = request, res = response) => {

    const { limit = 5, initiation = 0 } = req.query;
    const query = {condition: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(initiation))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

const postUser = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
};

const putUser = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
};

const deleteUser = async(req = request, res = response) => {

    const { id } = req.params;

    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {condition: false});

    res.json(user);
};

const patchUser = (req = request, res = response) => {
    res.json({
        msg: 'Desde el patch - controlador'
    });
};



module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}