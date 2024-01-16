const db = require('./db'); //connection

const User = {
    getAll : callback => {
        db.query('SELECT * FROM book.users', (err,ketqua) =>{
            if (err) throw err;
            callback(ketqua)
        });
    }

};

module.exports = User;