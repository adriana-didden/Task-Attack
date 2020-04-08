const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/secrets', require('./secretsController'));
apiControllers.use("/boards", require("./boardController"));
apiControllers.use("/columns", require("./boardController"));

module.exports = apiControllers;
