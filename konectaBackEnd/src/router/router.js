const express = require('express');

const {getEmployeesAll} = require('../bussines/employes/services/get-all-employe.js');
const {getEmployees} = require('../bussines/employes/services/get-employe.js');
const {insertEmployee} = require('../bussines/employes/services/insert-empolye.js');
//user administrador
const { getRequest } = require('../bussines/request/services/get-request.js');
const { insertRequest } = require('../bussines/request/services/insert-request.js');
const { deleteRequest } = require('../bussines/request/services/delete-request.js');
//user
const { insertUser } = require('../bussines/login/servicie/insert-empolye.js');
//jwt
const { verifyToken } = require('../middlewares/auth.middleware.js');
const { loginUser } = require('../bussines/login/servicie/searh-user.js');
const router = express.Router();
// empoinses
router.get('/get-all-employes', verifyToken, getEmployeesAll);
router.post('/get-employes', verifyToken, getEmployees);
router.post('/insert-employes', verifyToken, insertEmployee);
//user administrador
router.post('/get-request', verifyToken, getRequest);
router.post('/insert-request', verifyToken, insertRequest);
router.post('/delete-request',verifyToken, deleteRequest);
//login
router.post('/insert-user', insertUser);
router.post('/login-user', loginUser);
module.exports = router;

