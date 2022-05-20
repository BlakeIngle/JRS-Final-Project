
module.exports = (app) => {
    
    // const { validateWebToken } = require('../auth');
    const users = require('../controllers/users.controller');
    
    app.post('/api/users', users.createNewUser);
    app.post('/api/users/login', users.login);

    app.delete('/api/users/:id', users.deleteUserById);

}

