const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => res.sttus(200).json({ message: 'Hello World!' }));

module.exports = routes;
