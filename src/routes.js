const {Router} = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
    return res.sttus(200).json({message: 'Hello World!'});
});

module.exports = routes;