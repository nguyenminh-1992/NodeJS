const User = require('../models/user'); //ketqua

const userController = {
    getAllUser: (req,res) => {
        User.getAll(users => {
            res.render('index', {users});
        });
    }
};

module.exports = userController;